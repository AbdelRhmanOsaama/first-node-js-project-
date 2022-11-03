const express = require('express')
const session = require('express-session')
const sessionStorage = require('connect-mongodb-session')(session)

const app = express()

const homeRouter = require('./routes/home')
const prdRouter = require('./routes/productDetails')
const authRouter = require('./routes/auth')
const cartRouter = require('./routes/cart')
const sellerRoute = require('./routes/seller')


const storage = new sessionStorage({
    uri: 'mongodb://localhost:27017/nodeProject',
    Collection:"sessions"
})
app.use(session({
    secret:'secret to hashing and salting .........',
    saveUninitialized:false,
    resave:true,
    store: storage
}))

app.set('view engine' , 'ejs')
app.set('views')

app.use('/', homeRouter)
app.use('/product' , prdRouter)
app.use('/' , authRouter)
app.use('/cart' , cartRouter)
app.use('/seller' , sellerRoute)


app.get('/' ,(req,res,next)=>{
    res.render('index.ejs')
})


app.listen(4000 , ()=>{
    console.log('server listen on port 4000');
})

