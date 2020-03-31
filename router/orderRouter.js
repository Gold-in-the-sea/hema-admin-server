const express = require('express')
const router = express.Router()
const {insertOrder,delOrder,findOrder} = require('../controls/orderControl')

/**
 * @api {post} /order/add   添加订单
 * @apiName add
 * @apiGroup order
 *
 * @apiParam {String} orderCodes 订单名字.
 * @apiParam {String} userName 用户昵称.
 * @apiParam {String} userPhone 用户手机.
 * @apiParam {String} userAddr 用户地址.
 * @apiParam {String} goodsInfos 商品信息.
 * @apiParam {String} state 订单状态.
 * @apiParam {String} orderTime 下单时间戳.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/add',(req,res)=>{
  // 接受数据
  let {orderCodes,userName,userPhone,userAddr,goodsInfos} = req.body 
  let orderTime = new Date()
  let state = false
  console.log(req.body)
  // 处理数据 插入数据库
  insertOrder({orderCodes,userName,userPhone,userAddr,goodsInfos,state,orderTime})
  .then(()=>{res.send({err:0,msg:'插入成功'})})
  .catch((err)=>{
    res.send({err:-1,msg:'插入失败请重试'})})
  // 返回数据
})
/**
 * @api {post} /order/getInfo  查询全部或个人
 * @apiName getInfo
 * @apiGroup order
 *
 * @apiSuccess {String} err 状态码.
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {Array} list  查询到的数据.
 */
// 根据userName获取订单 
router.post('/getInfo',(req,res)=>{
  let  {userName} = req.body
  findOrder(userName)
  .then((infos)=>{res.send({list:infos,err:0,msg:'查询成功'})})
  .catch((err)=>{res.send({err:-1,msg:'查询失败请重试'})})
})
/**
 * @api {post} /order/del  订单删除
 * @apiName del
 * @apiGroup order
 *
 * @apiParam   {String} _id  订单主键id
 * @apiSuccess {String} err 状态码.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/del',(req,res)=>{
  // 获取要删除数据的id
  let {_id} = req.body
  delOrder(_id)
  .then(()=>{res.send({err:0,msg:'删除成功'})})
  .catch((err)=>{res.send({err:-1,msg:'删除失败请重试'})})
})


module.exports = router