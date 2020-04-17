const Router = require('koa-router')
const router = new Router({prefix: '/post'})
const jwt = require('koa-jwt')
const { create, getPosts } = require('../controller/post')
const { secret } = require('../config')

const auth = jwt({secret})

router.post('/', auth, create)
router.get('/', getPosts)

module.exports = router