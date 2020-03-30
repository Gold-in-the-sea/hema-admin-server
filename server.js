const db = require('./db/connect')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()


let userRouter = require('./router/userRouter')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user',userRouter)



app.listen(3000,()=>{
    console.log('服务器启动')
})