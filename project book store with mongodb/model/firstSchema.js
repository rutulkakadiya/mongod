const mongoose = require("mongoose");

const schema = mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    writer:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
})

const firstSchema = mongoose.model("BookStoreData", schema);

module.exports = firstSchema;