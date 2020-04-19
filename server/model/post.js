const mongoose = require('mongoose')

const { Schema, model } = mongoose

const postSchema = new Schema({
    content: { type: String, required: true },
    username: { type: String },
    likeUser: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User'}],
        select: false
    },
    commentCount: { type: Number }
}, {timestamps: true,
    versionKey: false
   })


module.exports = model('Post', postSchema)