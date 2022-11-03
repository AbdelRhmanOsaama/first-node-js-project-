const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/nodeProject'
const bcrypt = require('bcrypt')

const userSchem = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    isSeller:{
        type: Boolean,
        default:false
    }
})

const User = mongoose.model('user', userSchem);

exports.createNewUser = ( userName , email  , password)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {

            return User.findOne({email:email});

        }).then(user => {
            if(user){ 
                mongoose.disconnect()
                reject('email is already used')
            }
            else{
                return bcrypt.hash(password , 10)
            }
        }).then(hashedPassword=>{
            let user = new User ({
                userName: userName,
                email: email,
                password: hashedPassword,
            })
            return user.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch((err)=>{
            mongoose.disconnect()
            reject (err)
        })
    })
}

exports.login = (email , password)=>{
    return new Promise ((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>User.findOne({email:email})).then(user=>{
            if(!user){
                mongoose.disconnect()
                reject('please signup to continue')
            }else{
                bcrypt.compare(password , user.password).then(same=>{
                    if(!same){
                        mongoose.disconnect()
                        reject('incorrect password')
                    }else{
                        mongoose.disconnect()
                        resolve({
                            id: user._id,
                            isSeller: user.isSeller
                        })
                    }
                })
            }
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })
    });
}