const Router = require('koa-router')
const router = new Router()
const { register, login, getLikes } = require('../controller/user')
const auth = require('../utils/auth')


//登录注册
router.post('/register', register)
router.post('/login', login)

//获取用户的关注列表
router.get('/likes',auth, getLikes)


module.exports = router