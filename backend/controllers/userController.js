const db = require('../config/database')
const asyncHandler = require('express-async-handler')

const signupUser = async (email, password, role) => {
    try{
  
      //check that there is both an email and pass
      if(!email || !password){
        throw new Error('Email and Password are both required')
      }
  
       //check if email already exists in db
      const [rows] = db.promise().query('SELECT * FROM users WHERE user_email = ?', [email])
      const emailExists = rows[0].count > 0
      if(emailExists){
        throw new Error('Email already in use.')
      }
  
      //hash password
      const hashedPassword = await bcrypt.hash(password, 10)
  
      //save user
      const saveUserSql = 'INSERT INTO users(user_email, user_password, role) VALUE(?, ?, ?)'
      const saveUserValues = [email, hashedPassword, role]
      const saveUserResult = db.promise().query(saveUserSql, saveUserValues)
        
      //retrieve and return the new user
      const [newUserRows] = db.query('SELECT * FROM users WHERE user_email = ?', [email])
      return newUserRows[0]
      
    }
    catch(err){
      throw new Error('Error saving new user: ', err.message)
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
    res.json({message: 'sign up user success'})
})

exports.login_user = asyncHandler(async(req, res, next) => {
    res.status(200).json({message: 'log in user success'})
})