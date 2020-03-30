// 用户相关的数据模型

const mongoose = require('mongoose')

let adminSchema = new mongoose.Schema({
   adminName  : { type:String ,required:true},
   passWord : { type:String ,required:true},
   token :{ type:String ,required:false}
})

let adminModel = mongoose.model('admins',adminSchema)

module.exports = adminModel