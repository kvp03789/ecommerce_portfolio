const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')


router.get('/products', adminController.get_all_products)

router.post('/products', adminController.post_one_product)

router.put('/products', adminController.edit_one_product)

router.delete('/products/:productId', adminController.delete_one_product)

router.get('/orders', adminController.get_all_orders)

router.get('/customers', adminController.get_all_customers)

module.exports = router