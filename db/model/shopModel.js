//商品相关的数据模拟

const mongoose = require('mongoose')

let shopSchema = new mongoose.Schema({
   name  : { type:String ,required:false},
  /*  price : { type:String ,required:true},
   desc  : { type:String ,required:true},
   img   : { type:String ,required:false},
   shopType   : { type:String ,required:true},  */
})

let shopModel = mongoose.model('sb',shopSchema)

module.exports = shopModel