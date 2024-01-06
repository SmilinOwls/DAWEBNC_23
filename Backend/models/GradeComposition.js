const mongoose = require("mongoose");

const gradeCompositionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "",
    },
    gradeScale: {
        type: Number,
        required: true,
        default: 100,
    }, 
    weight: {
        type: Number,
        default: 0,
    }
}, {timestamps: true});
module.exports = gradeCompositionSchema;