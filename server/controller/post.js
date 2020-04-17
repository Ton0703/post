const Post = require('../model/post')
const User = require('../model/user')

class PostCtl {
    async getPosts(ctx){
        const { page = 1  } = ctx.query
        const _page = Math.max(page * 1, 1) - 1
        const perPage = 9
        const post = await Post.find().sort({ _id: -1}).skip(_page * perPage).limit(perPage).select('+likeUser')
        const total = await Post.find().countDocuments()
        const current = page
        ctx.body = { post, total, current}
    }
    async create(ctx){
        const user = ctx.state.user
        const { content } = ctx.request.body
        await new Post({content, username: user.username}).save()
        const list = await Post.find().sort({ _id: -1}).limit(9)
        ctx.body =  list
    }
    async checkPostExist(ctx, next){
        const post = await Post.findById(ctx.params.id)
        if(!post){
            ctx.throw(404, 'post不存在')
        }
        await next()
    }
    async like(ctx){
        const user = ctx.state.user
        const me = await User.findOne({username: user.username})
        const post = await await Post.findById(ctx.params.id).select('+likeUser')
        if(!post.likeUser.includes(me._id)){
            post.likeUser.push(me._id)
            post.save()
        }
        ctx.status = 204
    }
}

module.exports = new PostCtl()