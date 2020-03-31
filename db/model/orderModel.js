// 订单相关的数据模型

const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
  orderCodes: { type:String ,required:true },
  userName: { type:String ,required:true },
  userPhone: { type:String ,required:true },
  userAddr: { type:String ,required:true },
  goodsInfos: { type:String ,required:true },
  state: { type:String ,required:true },
  orderTime: { type:String ,required:true }
})

let orderModel = mongoose.model('orders',orderSchema)

module.exports = orderModel