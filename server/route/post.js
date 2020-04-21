const Router = require('koa-router')
const router = new Router({prefix: '/post'})
const { create, getPosts, getPost,  checkPostExist, like, disLike, delete: del, getCount } = require('../controller/post')
const auth = require('../utils/auth')

router.post('/', auth, create)
router.get('/', getPosts)
router.get('/:id', getPost)
router.delete('/:id',auth, checkPostExist, del )

//关注 和 取消关注
router.put('/like/:id',auth, checkPostExist,  like)
router.delete('/like/:id', auth, checkPostExist, disLike)


module.exports = router