const session = require('express-session')
const { isUser } = require('../middlewares/userAuth')
const prdModel = require('../models/products')

exports.getHome=(req,res,next)=>{

    let category = req.query.category
    if(category && category != 'all'){
        prdModel.getPrdsByCat(category).then(products=>{
            res.render('index' , {
                products: products,
                isAuth : req.session.userId,
                isSeller: req.session.isSeller
            })
        })
    }else{
        prdModel.getAllPrds(category).then(products=>{
            res.render('index' , {
                products: products,
                isAuth : req.session.userId,
                isSeller: req.session.isSeller

            })
        })
    }
    
}

