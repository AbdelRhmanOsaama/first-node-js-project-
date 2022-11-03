const prdModel = require('../models/products')

exports.getProductDetails = (req,res,next)=>{
    let id = req.params.id;
    prdModel.getPrdsById(id).then((product)=>{
        res.render('product',{
            product : product,
            isAuth : req.session.userId,
            isSeller: req.session.isSeller
        })
    })
}