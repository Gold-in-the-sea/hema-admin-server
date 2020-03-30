const express = require('express')

const {userReg,userLogin,userList,upDataUser} = require('../controls/userControl')


const router = express.Router()
//用户注册
 /**
 * @api {post} /user/reg  用户注册.
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String} userName  用户名.
 * @apiParam {String} passWord  密码.
 *
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {String} code 状态码0为成功，-1为失败
 */
router.post('/reg',(req,res)=>{
    let {userName,passWord} = req.body
    userReg(userName,passWord).then(()=>{
        res.send({code:0,msg:'账号注册成功'})
    }).catch((err)=>{res.send({code:-1,err})}) 
})
//用户登录
 /**
 * @api {post} /user/login 用户登录.
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} userName 用户名
 * @apiParam {String} passWord  密码
 * @apiSuccess {String} code 状态码0为成功，-1为失败
 * @apiSuccess {String} msg  信息提示
 * @apiSuccess {String} token  用户登录产生的token
 */
router.post('/login',(req,res)=>{
    let {userName,passWord} = req.body
    // console.log(userName,passWord)
    userLogin(userName,passWord).then((resbonce)=>{
        let {token} = resbonce
        res.send( {code:0,msg:'登录成功' ,token})
    }).catch((err)=>{
        console.log(err)
        res.send({code:-1,err})
}) 
})
//用户密码修改
 /**
 * @api {post} /user/updata 用户修改密码.
 * @apiName /updata
 * @apiGroup User
 *
 * @apiParam {String} _id 需要修改密码的用户id
 * @apiParam {String} passWord 需要修改密码用户新密码
 *
 * @apiSuccess {String} code 状态码0为成功，-1为失败.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/updata',(req,res)=>{
    let {_id,passWord} = req.body
    upDataUser({_id},{passWord}).then((responce)=>{
        res.send({code:0,msg:'密码修改成功'})
    }).catch((err)=>{
        res.send({code:-1,err})
    })
})
//获取用户列表信息
 /**
 * @api {post} /user  获取用户信息列表.
 * @apiName /user
 * @apiGroup User
 *
 * @apiParam {String} userlist 获取到的用户列表
 *
 * @apiSuccess {String} code 状态码0为成功，-1为失败.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/',(req,res)=>{
    userList().then((userlist)=>{
       res.send({code:0,msg:'查询成功',userlist})
    }).catch((err)=>{
        res.send({code:-1,err})
    })
})

module.exports = router