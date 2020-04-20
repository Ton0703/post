const Comment = require('../model/comment')
const Reply = require('../model/reply')

class discussCtl {
      async create(ctx){
          const { content } = ctx.request.body
          const postId = ctx.params.id
          const userId = ctx.state.user._id
          let commentId = ctx.request.body.commentId
          if(!commentId){
             await new Comment({ content, postId, userId }).save()
             const comments = await Comment.find({postId}).populate('userId').sort({_id: -1})
             const count = await Comment.find({postId}).count()
             ctx.body = comments
          } else {
             const comment = await Comment.findById(commentId).populate('userId')
             await new Reply({content, postId, userId, commentId, replyTo: comment.userId._id}).save()
             const reply = await Reply.find({commentId}).populate('userId replyTo')
             ctx.body = reply
          }
      }
      async getComment(ctx){
          const postId = ctx.params.id
          const comment = await Comment.find({postId}).populate('userId').sort({_id: -1})
          ctx.body = comment
      }
      async getReply(ctx){
          const commentId = ctx.params.id
          const reply = await Reply.find({commentId}).populate('userId replyTo')
          ctx.body = reply
      }
      async commentDel(ctx){
          const postId = await Comment.findById(ctx.params.id)
          await Comment.findByIdAndRemove(ctx.params.id)
          const comment = await Comment.find({postId: postId.postId}).populate('userId').sort({_id: -1})
          ctx.body = comment
      }
}

module.exports = new discussCtl()   