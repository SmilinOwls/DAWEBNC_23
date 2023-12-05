const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
    title: {
        type: String
    },
    fullText: {
        type: String
    },
    photo: {
        type: String
    },
    
})

const siteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String, 
        required: true
    },
    detailText: [
        detailSchema
    ],
    photo: {
        type: String,
        required: true
    }
}, {timestamps: true});


module.exports = mongoose.model("Site", siteSchema)