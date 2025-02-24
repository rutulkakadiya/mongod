const mongoose = require("mongoose");

const schema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["high", "low", "medium"],
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    }
})

const firstSchema = mongoose.model("Task_Details", schema);

module.exports = firstSchema;