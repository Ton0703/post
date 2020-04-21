const mongoose = require('mongoose')

const { Schema, model } = mongoose

const postSchema = new Schema({
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true,
    versionKey: false
   })


module.exports = model('Post', postSchema)