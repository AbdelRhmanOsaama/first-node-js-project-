const router = require('express').Router()
const homeController = require('../controllers/home')
const authentication = require('../middlewares/userAuth')

router.get('/' ,homeController.getHome)

module.exports= router;