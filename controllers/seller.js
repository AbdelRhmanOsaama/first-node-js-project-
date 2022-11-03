exports.getAdd= (req,res,next)=>{
    res.render('addProduct',{
        isAuth:true,
        isSeller:true
    })
}