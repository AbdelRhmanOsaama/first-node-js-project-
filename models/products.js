const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/nodeProject'

const prdSchem = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    description: String
})

const prd = mongoose.model('product', prdSchem)

exports.getAllPrds = () => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {

            return prd.find({});

        }).then(prd => {
            mongoose.disconnect()
            resolve(prd)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })

}

exports.getPrdsByCat = (category) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {

            return prd.find({category: category});

        }).then(prd => {
            mongoose.disconnect()
            resolve(prd)
        }).catch(err => reject(err))
    })
};

exports.getPrdsById = (id) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {

            return prd.findById(id);

        }).then(prd => {
            mongoose.disconnect()
            resolve(prd)
        }).catch(err => reject(err))
    })
};