const express = require('express')
const router = express.Router()
const {addMin,addLogin,adminDel,adminlist} = require('../controls/adminControl')
 /**
 * @api {post} /admin/add  管理员添加.
 * @apiName /add
 * @apiGroup Admin
 *
 * @apiParam {String} adminName  管理员账号.
 * @apiParam {String} passWord  密码.
 *
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {String} err  错误提示.
 * @apiSuccess {String} code 状态码0为成功，-1为失败
 */
router.post('/add',(req,res)=>{
    let {adminName,passWord} = req.body
    addMin(adminName,passWord).then((responce)=>{
        res.send({code:0,msg:'管理员添加成功'})
    }).catch((err)=>{
        res.send(err)
    })
})
 /**
 * @api {post} /admin/login  管理员登录.
 * @apiName /login
 * @apiGroup Admin
 *
 * @apiParam {String} adminName  管理员账号.
 * @apiParam {String} passWord  密码.
 *
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {String} err  错误提示.
 * @apiSuccess {String} code 状态码0为成功，-1为失败
 */
router.post('/login',(req,res)=>{
    let {adminName,passWord} = req.body
    addLogin(adminName,passWord).then((responce)=>{
        let {token} = responce
        res.send({code:0,msg:'登录成功',token})
    }).catch((err)=>{
        res.send(err)
    })
})
 /**
 * @api {post} /admin/del  管理员删除.
 * @apiName /del
 * @apiGroup Admin
 *
 * @apiParam {String} _id  管理员id.
 *
 *
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {String} err  错误提示.
 * @apiSuccess {String} code 状态码0为成功，-1为失败
 */
router.post('/del',(req,res)=>{
    let {_id} = req.body
    adminDel({_id}).then((responce)=>{
        res.send(responce)
    }).catch((err)=>{
        res.send(err)
    })
})
 /**
 * @api {post} /admin  管理员查询.
 * @apiName /admin
 * @apiGroup Admin
 *
 * @apiParam {String} _id  管理员id.
 *
 *
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {String} err  错误提示.
 * @apiSuccess {String} code 状态码0为成功，-1为失败
 */
router.post('/',(req,res)=>{
    adminlist().then((responce)=>{
        res.send({code:0,msg:'查询成功',adminlist:responce})
    }).catch((err)=>{
        res.send(err)
    })
})
module.exports = router
