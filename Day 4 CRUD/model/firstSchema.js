const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title:{
        type: String,
        required: true
    }
})

const firstSchema = mongoose.model("Practice", schema);

module.exports = firstSchema;