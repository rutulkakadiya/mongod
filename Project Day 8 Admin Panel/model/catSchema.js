const mongoose = require("mongoose");

const schema = mongoose.Schema({
    catImage:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    }

})

const catSchema = mongoose.model("category_data", schema)

module.exports = catSchema;