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

exports.post_one_product = asyncHandler(async(req, res, next) => {
    console.log('posting a product...', req.body)
    
    let { productName, productDescription, productStock, productPrice, productImageUrl, productCategory } = req.body
    let values = [
        productName,
        productDescription,
        parseInt(productStock),
        parseFloat(productPrice),
        productImageUrl,
        productCategory
    ];
    
    let sql = `
    INSERT INTO products (product_name, product_description, product_stock, product_price, product_image_url, product_category)
    VALUES (?, ?, ?, ?, ?, ?);
    `
    
    db.query(sql, values, (err, result)=>{
        if(err) throw err
        else{
            //select all rows in products table and return
            let sql = 'SELECT * FROM products;'
            db.query(sql, (selectErr,selectResult) => {
                if (selectErr) throw selectErr
                else{
                    res.status(200).json({message: 'product posted!', result: selectResult})
                }
            })
        }
        
    })
})