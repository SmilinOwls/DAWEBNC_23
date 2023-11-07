const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true    
    },
    fullText: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    detailPhotos: [String]
}, {timestamps: true});


module.exports = mongoose.model("Blog", blogSchema);