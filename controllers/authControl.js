const { isUser } = require("../middlewares/userAuth");
const authModel = require("../models/authModel")

exports.getSignup = (req , res , next)=>{
    res.render("signup", {
        isAuth : false,
        isSeller:false
    })
};

exports.postSignup = (req , res , next)=>{
    authModel.createNewUser(req.body.userName , req.body.email , req.body.password).then(()=>res.redirect("/login"))
    .catch(err=>{
        console.log(err);
        res.redirect("/signup")
    })

}

exports.getlogin= (req , res , next)=>{
    res.render("login" , {
        isAuth : false,
        isSeller:false
    })
}

exports.postLogin = (req , res , next)=>{
    authModel
    .login(req.body.email , req.body.password)
    .then((result)=>{
        req.session.userId= result.id;
        req.session.isSeller = result.isSeller
        res.redirect("/")
    })
    .catch(err =>{

        console.log(err);
        res.redirect("/login")

    })
}

exports.logout = (req , res , next)=>{
    req.session.destroy(()=>{
        res.redirect("/");
    })
}