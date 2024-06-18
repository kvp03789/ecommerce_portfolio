const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')


router.get('/products', adminController.get_all_products)

router.get('/orders', adminController.get_all_orders)

router.get('/customers', adminController.get_all_customers)

module.exports = router