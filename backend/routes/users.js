const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.get('/', userController.get_all_users)

router.post('/signup', userController.signup_user)

router.post('/login', userController.login_user)

module.exports = router