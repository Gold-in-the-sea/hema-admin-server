const db = require('./db/connect')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()


let userRouter = require('./router/userRouter')
let adminRouter = require('./router/adminRouter')
let orderRouter = require('./router/orderRouter')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//用户接口
app.use('/user',userRouter)
//管理员接口
app.use('/admin',adminRouter)
//订单接口
app.use('/order',orderRouter)



app.listen(3000,()=>{
    console.log('服务器启动')
})