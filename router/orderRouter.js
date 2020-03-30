const express = require('express')
const router = express.Router()
const {insertOrder,delOrder,findOrder} = require('../controls/orderControl')

/**
 * @api {post} /admin/order/add   管理平台添加菜品
 * @apiName add
 * @apiGroup order
 *
 * @apiParam {String} name 订单名字.
 * @apiParam {String} price 菜品价格.
 * @apiParam {String} desc Users unique ID.
 * @apiParam {String} img Users unique ID.
 * @apiParam {Number} orderType Users unique ID.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/add',(req,res)=>{
  // 接受数据
  let {orderCodes,userName,userAddr,goodsCodes} = req.body 
  let orderTime = new Date()
  console.log(req.body)
  // 处理数据 插入数据库
  insertOrder({orderCodes,userName,userAddr,goodsCodes,orderTime})
  .then(()=>{res.send({err:0,msg:'插入成功'})})
  .catch((err)=>{
    res.send({err:-1,msg:'插入失败请重试'})})
  // 返回数据
})
/**
 * @api {post} /admin/order/getInfo  查询全部
 * @apiName getInfo
 * @apiGroup order
 *
 * @apiSuccess {String} err 状态码r.
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
 * @api {post} /admin/order/del  订单删除
 * @apiName del
 * @apiGroup order
 *
 * @apiParam   {String} _id  菜品主键id
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {Array} list  查询到的数据.
 */
// 2. 删除订单
router.post('/del',(req,res)=>{
  // 获取要删除数据的id
  let {_id} = req.body
  delOrder(_id)
  .then(()=>{res.send({err:0,msg:'删除成功'})})
  .catch((err)=>{res.send({err:-1,msg:'删除失败请重试'})})
})


module.exports = router