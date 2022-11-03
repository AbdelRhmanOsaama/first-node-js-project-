const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/nodeProject'

const chartSchem = mongoose.Schema({
    name : String,
    price:Number,
    userId : String,
    amount:Number,
    productId : String,
    timesTamp:Number
});

const cartItem = mongoose.model('cart' , chartSchem);

exports.addNewItem = data =>{
    return new Promise((resolve ,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            let item = new cartItem(data);
            return item.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve();
        }).catch(err=>{
            mongoose.disconnect();
            reject()
        })
    }) 
}

exports.getItemByUser = userId =>{
    return new Promise((resolve ,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>
            cartItem.find({userId : userId})
        ).then((items)=>{
            mongoose.disconnect()
            resolve(items);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })
    }) 
}

exports.deleteItem = id =>{
    return new Promise((resolve ,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>
            cartItem.findByIdAndDelete(id)
        ).then(()=>{
            mongoose.disconnect()
            resolve();
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })
    }) 
}