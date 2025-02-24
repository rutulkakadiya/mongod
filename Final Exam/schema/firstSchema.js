const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:{
        type: String,
        required: true
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

const firstSchema = mongoose.model("Task_Manager", schema);

module.exports = firstSchema;