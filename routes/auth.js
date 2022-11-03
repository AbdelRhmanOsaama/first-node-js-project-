const router = require('express').Router()
const bodyParser = require('body-parser')
const userAuth = require('../middlewares/userAuth')
const authController = require('../controllers/authControl')

router.get("/signup",userAuth.notUser , authController.getSignup);

router.post("/signup",userAuth.notUser, bodyParser.urlencoded({extended:true}),
authController.postSignup);

router.get("/login" ,userAuth.notUser, authController.getlogin);
router.post("/login" ,userAuth.notUser,bodyParser.urlencoded({extended:true}),authController.postLogin)

router.all('/logout' , authController.logout)

module.exports = router