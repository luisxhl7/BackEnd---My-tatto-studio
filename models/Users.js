const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    numberPhone: {
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    document:{
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})

module.exports = model('User', UserSchema)