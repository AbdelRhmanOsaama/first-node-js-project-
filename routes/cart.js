const router = require('express').Router()
const bodyParser = require('body-parser')
const authentication = require('../middlewares/userAuth')
const cartControl = require('../controllers/cart')

router.get('/', authentication.isUser , cartControl.getCart)
router.post('/' , authentication.isUser , bodyParser.urlencoded({extended:true}) , cartControl.postCart)

router.post('/delete' , authentication.isUser , bodyParser.urlencoded({extended:true}),cartControl.postDelete)

module.exports = router