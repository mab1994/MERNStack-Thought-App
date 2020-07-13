const mongoose = require('mongoose')

// ---Define User Schema---
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true   
    },
    password:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model( 'user', UserSchema )