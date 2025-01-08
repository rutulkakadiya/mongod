const mongoose = require('mongoose');

const schema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    bgImage: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: String, Number,
        required: true
    },
    timing: {
        type: String, Number,
        required: true
    },
    dimensions: {
        type: String, Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    viewer: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String, Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    

})

const firstSchema = mongoose.model("Movie_Data", schema);

module.exports = firstSchema;