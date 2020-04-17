const Router = require('koa-router')
const router = new Router()
const { register, login } = require('../controller/user')

router.post('/register', register)
router.post('/login', login)

module.exports = router