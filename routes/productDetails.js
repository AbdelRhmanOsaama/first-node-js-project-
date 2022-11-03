const router = require('express').Router()
const prdController = require('../controllers/productDetails')

router.get('/:id' , prdController.getProductDetails)

module.exports= router;