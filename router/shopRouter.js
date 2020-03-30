const express =require('express')
const router=express.Router()
const {
    findShopByKw,
    findShopByType,
    findShopByPage,
    updateShop,
    delShop,
    findShop,
    insertShop
}=require('../controls/shopControl')
 

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
router.post('/add',(req,res)=>{
    //接受数据
    let {name,price,img,desc,shopType}=req.body
    //处理数据 插入数据库
    insertShop({name,price,img,desc,shopType})
    .then(()=>{res.send({err:0,msg:'插入成功'})})
    .catch((err)=>{
        res.send({err:-1,msg:'插入失败请重试'})
    })
    //返回数据
})

module.exports = router