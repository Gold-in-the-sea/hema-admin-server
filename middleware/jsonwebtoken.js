const jsonWebToken = require('jsonwebtoken')
const {encrypt} = require('./jsonencrypt')

module.exports = {
    
    createToken(data,expires){
        let obj = {}
        obj.data = data||{}
        //token的创建时间
        obj.createTime = (new Date()).getTime()
        //token的过期时间
        obj.expires = expires||1000*60*60*24*7
        let token = jsonWebToken.sign(obj,encrypt)
        return token
    },
    verifyToken(token){
        let result = null
        try{
            let {data,createTime,expires} = jsonWebToken.verify(token,encrypt)
            let nowTime = new Date().getTime()
            if(nowTime-createTime<expires){
                result = data
            }
        } catch(error){

        }
        return result
    }
}