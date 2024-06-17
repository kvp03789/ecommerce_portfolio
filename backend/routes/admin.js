const express = require('express')
const router = express.Router()

router.post('/addItem', async (req, res, next) => {
    res.json({message: 'item added'})
})