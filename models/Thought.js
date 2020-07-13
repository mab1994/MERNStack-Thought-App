const mongoose = require('mongoose')

// ---Define Thought Schema---
const ThoughtSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
})

module.exports = mongoose.model('thought', ThoughtSchema)