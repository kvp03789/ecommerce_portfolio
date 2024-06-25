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

exports.edit_one_product = asyncHandler(async(req, res, next) => {
    console.log('editing product...')
    let { productId, productName, productDescription, productStock, productPrice, productImageUrl, productCategory } = req.body
    let values = [
        productName,
        productDescription,
        parseInt(productStock),
        parseFloat(productPrice),
        productImageUrl,
        productCategory,
        productId
    ];
    let sql = '\
    UPDATE products\
    SET product_name = ?, product_description = ?, product_stock = ?, product_price = ?, product_image_url = ?, product_category = ?\
    WHERE product_id = ?;\
    '
    db.query(sql, values, (err, result) => {
        if(err) throw Error(err.message)
        else{
            res.status(200).json({message: 'edited product!', result})
        }
    })
    
})

exports.delete_one_product = asyncHandler(async(req, res, next) => {
    console.log('deleting product...')
    const { productId } = req.params
    const selectSql = 'SELECT * FROM products WHERE product_id = ?';
    let values = [productId]
    
    db.query(selectSql, values, (err, results) => {
        if(err) throw Error(err.message)
        else{
            let sql = '\
            DELETE FROM products\
            WHERE product_id = ?;\
            '
            const rowToDelete = results[0]
            db.query(sql, values, (err, result) => {
                if(err){
                    throw Error(err.message)
                }
                else{
                    res.status(200).json({message: 'deleted product!', result: rowToDelete })
                }
            })
            
        }
    })
    
})