const Router = require('koa-router')
const router = new Router()
const { create, getComment, commentDel } = require('../controller/discuss')
const { checkPostExist } = require('../controller/post')
const auth = require('../utils/auth')

router.post('/:id/discuss', auth, checkPostExist , create)
router.get('/:id/discuss', getComment)

router.delete('/comment/:id', auth, commentDel)

module.exports = router
