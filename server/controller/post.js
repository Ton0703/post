const Post = require('../model/post')

class PostCtl {
    async getPosts(ctx){
        const { page = 1  } = ctx.query
        const _page = Math.max(page * 1, 1) - 1
        const perPage = 9
        const post = await Post.find().sort({ _id: -1}).skip(_page * perPage).limit(perPage)
        const total = await Post.find().countDocuments()
        const current = page
        ctx.body = { post, total, current}
    }
    async create(ctx){
        const user = ctx.state.user
        const { content } = ctx.request.body
        const post = await new Post({content, username: user.username}).save()
        const list = await Post.find().sort({ _id: -1})
        ctx.body =  list
    }
}

module.exports = new PostCtl()