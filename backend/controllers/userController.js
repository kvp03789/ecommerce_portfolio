const db = require('../config/database')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = (userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: "1d" })
  return token
}

const signupUser = async (email, password, role = 'user') => {
    try{
      //check that there is both an email and pass
      if(!email || !password){
        throw new Error('Email and Password are both required')
      }
  
       //check if email already exists in db
      const [rows] = await db.promise().query('SELECT COUNT(*) FROM users WHERE user_email = ?', [email])
      console.log('DEBUG - rows: ', rows)
      const emailExists = rows[0].count > 0
      console.log('DEBUG - emailExists: ', emailExists)
      if(emailExists){
        throw new Error('Email already in use.')
      }
  
      //hash password
      const hashedPassword = await bcrypt.hash(password, 10)
  
      //save user
      const saveUserSql = 'INSERT INTO users(user_email, user_password, role) VALUE(?, ?, ?)'
      const saveUserValues = [email, hashedPassword, role]
      const [saveUserResult] = await db.promise().query(saveUserSql, saveUserValues)
        
      //retrieve and return the new user
      const [newUserRows] = await db.promise().query('SELECT * FROM users WHERE user_email = ?', [email])
      return newUserRows[0]
      
    }
    catch(err){
      throw new Error(`Error saving new user: ${err.message}`)
    }
  }

const loginUser = async (email, password) => {
  console.log('logging in user...')
  try{
    //see if user exists
    const [user] = await db.promise().query('SELECT * FROM users WHERE user_email = ?', [email])
    console.log('DEBUG - user result: ', user)
    if(user.length == 0){
      throw new Error('User not found.')
    }

    //check that password entered matches store password
    const hashedPassword = user[0].user_password
    const passwordsMatch = await bcrypt.compare(password, hashedPassword)
    
    if(!passwordsMatch){
      throw new Error('Incorrect password.')
    }
    else{
      return user[0]
    }
  }
  catch(err){
    throw new Error(`There was a problem logging user in: ${err.message}`)
  }
}

exports.get_all_users = asyncHandler(async (req, res, next) => {
    let sql = '\
    SELECT * FROM users\
    '
    db.query(sql, (err, results) => {
        if(err){
            throw new Error(err.message)
        }
        else{
            res.status(200).json({message: 'get all users success', results})
        }
    })
})

exports.signup_user = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body

    const newUser = await signupUser(email, password)
    const token = createToken(newUser.user_id, newUser.role)
    res.json({message: 'sign up user success', result: newUser, token })
})

exports.login_user = asyncHandler(async(req, res, next) => {
  const { email, password } = req.body
  const user = await loginUser(email, password)
  const token = createToken(user.user_id, user.role)
  res.status(200).json({message: 'log in user success', result: user, token })
})