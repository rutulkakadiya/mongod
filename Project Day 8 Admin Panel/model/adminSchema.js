const mongoose = require("mongoose");

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
    },
})

const adminSchema  = mongoose.model("admin_data", schema);

module.exports = adminSchema;