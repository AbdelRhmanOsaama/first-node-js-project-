const router = require('express').Router()
const sellAuth = require('../middlewares/seller')
const sellerControl = require('../controllers/seller')

router.get('/add' , sellAuth , sellerControl.getAdd)

module.exports=router