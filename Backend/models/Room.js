const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    place: {
        type: mongoose.Schema.ObjectId,
        ref: "Place",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    typeRoom: {
        type: String,
        default: "Standard"
    },
    photos: [String],
    perks: {
        type: [String],
        required: true
    },
    coupon: {
        type: Number
    },
    numOfBed: {
        type: Number
    },
    checkIn: {
        type: String,
    },
    checkOut:{
        type: String,
    },
    maxGuests: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    countInStock: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model("Room", roomSchema);