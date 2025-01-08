const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:{
        Type: String,
        required: true
    }
})

const firstSchema = schema.model("Admin_Data", schema);

module.exports = firstSchema;