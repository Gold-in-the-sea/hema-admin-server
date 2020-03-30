const adminModel = require('../db/model/adminModel')
const {createToken} = require('../middleware/jsonwebtoken')

//添加管理员
let addMin =async (adminName,passWord)=>{
    let isExst = await adminModel.findOne({adminName})
    let result = ''
    if(isExst){
        throw '该管理员已存在'
    }else{
        result = await adminModel.insertMany({adminName,passWord})
        
    }
    return result
}
//登录管理员
let addLogin =async (adminName,passWord)=>{
    let result = await adminModel.findOne({adminName,passWord})
    if(result){
        let {_id,token} = result
        if(token){
            return {token}
        }else{
            let token = createToken({result})
            await userModel.updateOne({_id},{token})
            return {token}
        }
    }else{
        throw '用户名或密码错误'
    }
}
//删除管理员
let adminDel = async ({_id})=>{
    let result  = await adminModel.deleteOne({_id})
    if(result){
        return {code:0,msg:'管理员删除成功'}
    }else{
        throw "未知错误请重试"
    }
}
//查询管理员
let adminlist = async ()=>{
    let result = await adminModel.find()
    if(result){
        return result
    }else{
        return '暂无用户信息'
    }
}
module.exports={addMin,addLogin,adminDel,adminlist}