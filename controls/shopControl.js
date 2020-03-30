const shopModel = require('../db/model/shopModel')


let insertShop = async (obj) => {
    let result = await shopModel.insertMany(obj)
    return result
}
//查询全部商品   
let findShop = async (_id) => {
    let result = await shopModel.find({ _id })
    return result
}

//删除商品
let delShop = async (_id) => {
    let result = await shopModel.deleteOne({ _id })
    return result
}

//修改数据
let updateShop = async (_id, updateInfo) => {
    let result = await shopModel.updateOne({ _id }, updateInfo)
    return result
}

//分页查询
let findShopByPage = async (page, pageSize) => {
    let allShop = await shopModel.find()
    //总数据条数
    let allCount = allFood.length
    //每一页的数据
    let result = await shopModel.find().skip((Number(page) - 1) * pageSize).limit(Number(pageSize))
    return { result, allCount }
}


//分类查询
let findShopByType = async (shopType) => {
    let result = await shopModel.find({ shopType })
    return result
}

//关键字查询
let findShopByKw = async (kw, page, pageSize) => {
    let regex = new RegExp(kw)
    //满足条件的所有数据
    let allShop = await shopModel.find({ $or: [{ desc: { $regex: regex } }, { name: { $regex: regex } }] })
    let allCount = allShop.length

    //分页后满足关键字的数据
    let result =await shopModel.find({$or:[{desc:{$regex:regex}},{name:{$regex:regex}}]})
    .skip(Number((page-1)*pageSize)).limit(Number(pageSize))
    return {result,allCount}
}

module.exports = {
    findShopByKw,
    findShopByType,
    findShopByPage,
    updateShop,
    delShop,
    findShop,
    insertShop
}