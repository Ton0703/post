const mongoose = require('mongoose')

const { Schema, model } = mongoose

const replySchema = new Schema({
    content: { type: String, required: true },
    commentId: { type: String},
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    postId: { type: String },
    replyTo: { type: Schema.Types.ObjectId, ref: 'User'}
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Reply', replySchema)