const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)