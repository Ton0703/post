const Router = require('koa-router')
const router = new Router({prefix: '/post'})
const jwt = require('koa-jwt')
const { create, getPosts, checkPostExist } = require('../controller/post')
const { like } = require('../controller/post')
const { secret } = require('../config')

const auth = jwt({secret})

router.post('/', auth, create)
router.get('/', getPosts)


router.put('/like/:id',auth, checkPostExist,  like)

module.exports = router