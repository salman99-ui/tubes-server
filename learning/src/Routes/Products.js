const express = require('express')
const {body} = require('express-validator')
const router = express.Router()
const productsController = require('../Controllers/Products')

router.get("/product" , productsController.getAllProduct )
router.post('/product' ,[body('title').isLength({min : 5})] , productsController.createProduct)
module.exports = router 