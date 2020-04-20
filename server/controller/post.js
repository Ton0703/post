const Post = require('../model/post')

class PostCtl {
    async getPosts(ctx){
        const { page = 1  } = ctx.query
        const _page = Math.max(page * 1, 1) - 1
        const perPage = 12
        const post = await Post.find().sort({ _id: -1}).skip(_page * perPage).limit(perPage).select('+likeUser').populate('userId')
        const total = await Post.find().countDocuments()
        const current = page
        ctx.body = { post, total, current}
    }
    async getPost(ctx){
        const post = await Post.findById(ctx.params.id).select('+likeUser').populate('userId')
        ctx.body = post
    }
    async create(ctx){
        const user = ctx.state.user
        const { content } = ctx.request.body
        await new Post({content, userId: user._id}).save()
        const list = await Post.find().sort({ _id: -1}).limit(9).select('+likeUser').populate('userId')
        ctx.body =  list
    }
    async delete(ctx){
        await Post.findByIdAndRemove(ctx.params.id)
        ctx.status = 204
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
        const post = await await Post.findById(ctx.params.id).select('+likeUser')
        if(!post.likeUser.includes(user._id)){
            post.likeUser.push(user._id)
            post.save()
        }
        ctx.body = user._id
    }
    async disLike(ctx){
        const post = await Post.findById(ctx.params.id).select('+likeUser')
        const index = post.likeUser.map(item => item.toString()).indexOf(ctx.state.user._id)
        if(index > -1){
            post.likeUser.splice(index, 1)
            post.save()
        }
        ctx.body = ctx.state.user._id
    }
}

module.exports = new PostCtl()