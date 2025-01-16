const mongoose = require('mongoose');

const schema = mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    contact:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const firstSchema = mongoose.model("admin-data2", schema);

module.exports = firstSchema;