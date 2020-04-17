const mongoose = require('mongoose')

const { Schema, model } = mongoose

const postSchema = new Schema({
    content: { type: String, required: true },
    username: { type: String },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number }
}, {timestamps: true,
    versionKey: false
   })


module.exports = model('Post', postSchema)