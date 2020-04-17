const User = require('../model/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config.js')

class UserCtl {
     async register(ctx){
         const { username, password, confirmPassword, email } = ctx.request.body
         const user = await User.findOne({username})
         if(user){
             ctx.throw(409,'用户已经存在')
         }
         const newUser = await new User(ctx.request.body).save()
         const token = jwt.sign({username}, secret, {expiresIn:'1d'})
         ctx.body = {newUser, token} 
     }
     async login(ctx){
         const { username } = ctx.request.body
         const user = await User.findOne(ctx.request.body)
         if(!user){
             ctx.throw(404, '账号或则密码错误')
         }
         const token = jwt.sign({username}, secret, {expiresIn: '1d'})
         ctx.body = { username, token}
     }
}
module.exports = new UserCtl()