const express = require('express')
const router = express.Router()
const {
    findShopByKw,
    findShopByType,
    findShopByPage,
    updateShop,
    delShop,
    findShop,
    insertShop
} = require('../controls/shopControl')


/**
 * @api {post} /shop/add 平台添加商品
 * @apiName add
 * @apiGroup Shop
 * 
 * @apiParam {String} name 商品名字.
 * @apiParam {String} price 商品价格.
 * @apiParam {String} desc Users unique ID.
 * @apiParam {String} img User unique ID.
 * @apiParam {String} shopType Users unique ID.
 * 
 * @apiParam {String} err 状态码.
 * @apiParam {String} msg 信息提示.
 */
router.post('/add', (req, res) => {
    //接受数据

    let { name, price, img, desc, shopType } = req.body
    //处理数据 插入数据库
    insertShop({ name, price, img, desc, shopType })
        .then(() => { res.send({ err: 0, msg: '插入成功' }) })
        .catch((err) => {
            res.send({ err: -1, msg: '插入失败请重试' })
        })
    //返回数据
})
/**
 * @api {post} /shop/getInfoById  查询全部
 * @apiName getInfoById
 * @apiGroup Shop
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {Array} list  查询到的数据.
 */
// 根据id获取商品 
router.post('/getInfoById',(req,res)=>{
    let  {_id} = req.body
    findShop(_id)
    .then((infos)=>{res.send({list:infos,err:0,msg:'查询成功'})})
    .catch((err)=>{res.send({err:-1,msg:'查询失败请重试'})})
  })
/**
 * @api {post} /shop/del  菜品删除
 * @apiName del
 * @apiGroup Shop
 *
 * @apiParam   {String} _id  商品主键id
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {Array} list  查询到的数据.
 */
// 2. 删除商品
router.post('/del',(req,res)=>{
    // 获取要删除数据的id
    let {_id} = req.body
    delShop(_id)
    .then(()=>{res.send({err:0,msg:'删除成功'})})
    .catch((err)=>{res.send({err:-1,msg:'删除失败请重试'})})
  
  })

  /**
 * @api {post} /shop/update   修改
 * @apiName update
 * @apiGroup Shop
 *
 * @apiParam {String} _id  商品主键id
 * @apiParam {String} name 商品名字.
 * @apiParam {String} price 商品价格.
 * @apiParam {String} desc Users unique ID.
 * @apiParam {String} img Users unique ID.
 * @apiParam {Number} shopType Users unique ID.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */

router.post('/update',(req,res)=>{
    // 获取修改数据的参数
    let {_id,name,price,img,desc,shopType} = req.body 
    console.log({_id,name,price,img,desc,shopType})
    updateShop(_id,{name,price,img,desc,shopType})
    .then(()=>{res.send({err:0,msg:'修改成功'})})
    .catch((err)=>{res.send({err:-1,msg:'修改失败请重试'})})
  })

  /**
 * @api {post} /shop/getInfos   分页查询
 * @apiName getInfos
 * @apiGroup Shop
 *
 * @apiParam {String} _id 商品主键id
 * @apiParam {String} page 查询页码数.
 * @apiParam {String} pageSize 每页的数据条数.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/getInfos',(req,res)=>{
    let page = req.body.page||1 //查询的第几页数据
    let pageSize = req.body.pageSize ||2 //每页几条数据
    findShopByPage(page,pageSize)
    .then((data)=>{
       console.log(data)
       let {result,allCount}=data 
      res.send({err:0,msg:'查询成功',list:result,allCount})
    })
    .catch((err)=>{
        console.log(err)
        res.send({err:-1,msg:'查询失败请重试'})})
  })
// 分类查询  
// 分类查询的数据也可能很多 需要和分页查询做关联
/**
 * @api {post} /shop/getInfosByType   分类查询
 * @apiName getInfosByType
 * @apiGroup Shop
 *
 * @apiParam {String} shopType 类别.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/getInfosByType',(req,res)=>{
    let {shopType} = req.body 
    findShopByType(shopType)
    .then((data)=>{
     res.send({err:0,msg:'查询成功',list:data})
   })
   .catch((err)=>{res.send({err:-1,msg:'查询失败请重试'})})
  
  })
// 模糊查询 关键字查询带分页功能
// 也要和分页做关联
/**
 * @api {post} /shop/getInfosByKw   关键字查询
 * @apiName getInfosByKw
 * @apiGroup Shop
 *
 * @apiParam {String} kw 关键字 
 * @apiParam {String} page 页码数 
 * @apiParam {String} pageSize 每页条数.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/getInfosByKw',(req,res)=>{
    let kw = req.body.kw ||''
    let page = req.body.page||1
    let pageSize = req.body.pageSize||2
    findShopByKw(kw,page,pageSize)
    .then((data)=>{
      res.send({err:0,msg:'查询成功',list:data.result,allCount:data.allCount})
    })
    .catch((err)=>{res.send({err:-1,msg:'查询失败请重试'})})
  })


module.exports = router