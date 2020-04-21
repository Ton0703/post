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
         const { _id } = newUser
         const token = jwt.sign({username, _id}, secret, {expiresIn:'1d'})
         ctx.body = {username, id:_id, token} 
     }
     async login(ctx){
         const user =  await User.findOne(ctx.request.body)
         const { username, _id } = user
         if(!user){
             ctx.throw(404, '账号或则密码错误')
         }
         const token = jwt.sign({username, _id}, secret, {expiresIn: '1d'})
         ctx.body = { username,id: _id, token }
     }
     async getLikes(ctx){
         const userId = ctx.state.user._id
         const user = await User.findById(userId).select('+likePosts')
         ctx.body = user.likePosts
     }
}
module.exports = new UserCtl()