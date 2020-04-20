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
             ctx.body = comments
          } else {
             const reply = await new Reply({content, postId, userId, commentId}).save()
             ctx.body = reply
          }
      }
      async getComment(ctx){
          const postId = ctx.params.id
          const comment = await Comment.find({postId}).populate('userId').sort({_id: -1})
          const reply = await Reply.find({postId}).sort({_id: -1})
          ctx.body = { comment, reply }
      }
      async commentDel(ctx){
          const postId = await Comment.findById(ctx.params.id)
          await Comment.findByIdAndRemove(ctx.params.id)
          const comment = await Comment.find({postId: postId.postId}).populate('userId').sort({_id: -1})
          ctx.body = comment
      }
}

module.exports = new discussCtl()