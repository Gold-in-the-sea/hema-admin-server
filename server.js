const db = require('./db/connect')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()


let shopRouter=require('./router/shopRouter')
let userRouter = require('./router/userRouter')
let adminRouter = require('./router/adminRouter')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//用户接口
app.use('/user',userRouter)
//商品接口
app.use('/shop',shopRouter)


//管理员接口
app.use('/admin',adminRouter)



app.listen(3000,()=>{
    console.log('服务器启动')
})