const Post = require('../model/post')
const User = require('../model/user')
const Comment = require('../model/comment')
const Reply = require('../model/reply')

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
        const postId = ctx.params.id
        await Post.findByIdAndRemove(postId)
        await Comment.find({postId}).remove()
        await Reply.find({postId}).remove()
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
        const userId = ctx.state.user._id
        const user = await User.findById(userId).select('+likePosts')
        if(!user.likePosts.includes(ctx.params.id)){
            user.likePosts.push(ctx.params.id)
            user.save()
        }
        ctx.body = ctx.params.id
    }
    async disLike(ctx){
        const userId = ctx.state.user._id
        const user = await User.findById(userId).select('+likePosts')
        const index = user.likePosts.map(item => item.toString()).indexOf(ctx.params.id)
        if(index > -1){
            user.likePosts.splice(index, 1)
            user.save()
        }
        ctx.body = ctx.params.id
    }
}

module.exports = new PostCtl()