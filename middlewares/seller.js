module.exports = (req,res,next) =>{
    if(req.session.isSeller) next()
    else console.log("not seller")
}