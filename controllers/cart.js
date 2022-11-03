const cartModel = require('../models/cart');

exports.getCart = (req,res,next) =>{
    cartModel.getItemByUser(req.session.userId).then(items =>{
        res.render('cart',{
            items: items,
            isAuth: true,
            isSeller:req.session.isSeller
        })
    }).catch(err =>{
        console.log(err);
    })
}

exports.postCart = (req,res,next) => {
    cartModel.addNewItem({
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        productId: req.body.productId,
        userId: req.session.userId,
        timesTamp: Date.now()
    }).then(()=>{
        res.redirect('/cart')
    }).catch(err=>{
        console.log(err);
    })
}

exports.postDelete= (req,res,next) => {
    cartModel.deleteItem(req.body.cartId).then(()=>{
        res.redirect('/cart')
    }).catch(err=>{
        console.log(err);
    })
}