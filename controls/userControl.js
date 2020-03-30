const userModel = require('../db/model/userModel')
const {createToken} = require('../middleware/jsonwebtoken')

//注册
let userReg = async (userName,passWord)=>{
    let isExst = await userModel.findOne({userName})
    let result = ''
    if(isExst){
        throw '该用户名已存在'
    }else{
        result = await userModel.insertMany({userName,passWord})

    }
    return result
}
//登录
let userLogin = async (userName,passWord)=>{
    let result = await userModel.findOne({userName,passWord})
    if(result){
        let {_id} = result
        let token = createToken({result})
      await userModel.updateOne({_id},{token})
        return {token}
    }else{
        throw '用户名或密码错误'
    }
}
//获取用户列表
let userList = async ()=>{
    let result = await userModel.find()
    if(result){
        return result
    }else{
        throw '暂无用户信息'
    }
}
//修改用户密码
let upDataUser = async ({_id},{passWord})=>{
    let result = await userModel.updateOne({_id},{passWord})
    if(result){
        return result
    }else{
        throw '密码修改失败'
    }
   
}
module.exports={userReg,userLogin,userList,upDataUser}