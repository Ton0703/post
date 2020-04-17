const Router = require('koa-router')
const router = new Router({prefix: '/post'})
const jwt = require('koa-jwt')
const { create, getPosts, getPost,  checkPostExist, like, disLike, delete: del } = require('../controller/post')
const { secret } = require('../config')

const auth = jwt({secret})

router.post('/', auth, create)
router.get('/', getPosts)
router.get('/:id', getPost)
router.delete('/:id',auth, checkPostExist, del )

//关注 和 取消关注
router.put('/like/:id',auth, checkPostExist,  like)
router.delete('/like/:id', auth, checkPostExist, disLike)

module.exports = router