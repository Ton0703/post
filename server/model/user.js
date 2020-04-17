const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
    username: { type: String, required: true},
    avatar: { type: String }, 
    emails: { type: String },
    password: { type: String, required: true, select: false },
    likeposts: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
        select: false
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema)