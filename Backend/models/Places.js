const mongoose = require("mongoose");


const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    sites: {
        type: mongoose.Schema.ObjectId,
        ref: "Site"
    },
    country: {
        type: String
    },
    placePic:{
        type: String,
        required: true,
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    extraInfo: {
        type: String,
        required: true,
        default: ""
    },
    ratings: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String, 
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

}, {timestamps: true});

module.exports = mongoose.model("Place", placeSchema);