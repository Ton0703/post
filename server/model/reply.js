const mongoose = require('mongoose')

const { Schema, model } = mongoose

const replySchema = new Schema({
    content: { type: String, required: true },
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    postId: { type: String }
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Reply', replySchema)