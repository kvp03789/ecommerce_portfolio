const db = require('../config/database')
const asyncHandler = require('express-async-handler')

exports.get_all_customers = asyncHandler(async(req, res, next) => {
    let sql = `SELECT * FROM customers`
    db.query(sql, (err, result)=>{
        if(err) throw err
        res.json({message: 'GET all customers', result})
    })
})

exports.get_all_products = asyncHandler(async(req, res, next) => {
    let sql = `SELECT * FROM products`
    db.query(sql, (err, result)=>{
        if(err) throw err
        res.json({message: 'GET all products', result})
    })
})

exports.get_all_orders = asyncHandler(async(req, res, next) => {
    let sql = `SELECT * FROM orders`
    db.query(sql, (err, result)=>{
        if(err) throw err
        res.json({message: 'GET all orders', result})
    })
})