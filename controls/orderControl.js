const OrderModel = require('../db/model/orderModel')

//添加订单
let insertOrder = async (obj)=>{
  // 调用数据模型插入方法
  let result = await OrderModel.insertMany(obj)
  return result
}

//删除订单
let delOrder = async (_id)=>{
    let result  = await OrderModel.deleteOne({_id})
    if(result){
        return {code:0,msg:'订单删除成功'}
    }else{
        throw "未知错误请重试"
    }
}
//查询订单
let findOrder = async (userName)=>{
    let result = await OrderModel.find({userName})
    if(result){
        return result
    }else{
        return '暂无用户信息'
    }
}
module.exports={insertOrder,delOrder,findOrder}