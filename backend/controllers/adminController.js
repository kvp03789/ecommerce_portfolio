const db = require('../config/database')

exports.get_all_customers = async(req, res, next) => {
    let sql = `SELECT * FROM customers`
    db.query(sql, (err, result)=>{
        if(err) throw err
        res.json({message: 'GET all customers', result})
    })
    
}

exports.get_all_products = async(req, res, next) => {
    res.json({message: 'GET all products'})
}

exports.get_all_orders = async(req, res, next) => {
    res.json({message: 'GET all orders'})
}