const mongoose = require('mongoose')

const { Schema , model } = mongoose

const commentSchema = new Schema({
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: String }
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Comment', commentSchema)