const Room = require("../models/Room");
const Place = require("../models/Places")
const ApiFeature = require("../utils/ApiFeature")

const roomControllers = {
    createRoom: async(req, res) => {
        const newRoom = await Room({
            ...req.body,
        });
        try {
            const savedRoom = await newRoom.save();
            res.status(200).json(savedRoom);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getRoomsByPlaceId: async (req, res) => {
        const place = await Place.findById(req.params.id);
        if(!place){
            return res.status(404).json({
                success: false,
                message: "Place not found !!!"
            })
        }
        try {
            const apiFeature = new ApiFeature(Room.find({place: req.params.id}), req.query).search().filter();
            let room = await apiFeature.query;
            res.status(200).json(room);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getDetailRoom: async (req, res) => {
        try {
            const room = await Room.findById(req.params.id);
            if(!room){
                return res.status(404).json({
                    success: false,
                    message: "Room not found !!!"
                })
            }
            res.status(200).json(room);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllRooms: async (req, res) => {
        try {
            const apiFeature = new ApiFeature(Room.find(), req.query).search().filter();
            let room = await apiFeature.query;
            res.status(200).json(room);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteRoom: async (req, res) => {
        const room = await  Room.findById(req.params.id);
        if(!room){
            return res.status(404).json({
                success: false,
                message: "Room not found !!!"
            })
        }
        try {
            await room.remove();
            return res.status(200).json({
                success: true,
                message: "Room has been deleted successfully"
            })
        } catch (error) {
            console.log(error)
        }
    },

    updateRoom: async (req, res) => {
        const room = await  Room.findById(req.params.id);
        if(!room){
            return res.status(404).json({
                success: false,
                message: "Room not found !!!"
            })
        }

        const {
            title,
            description,
            typeRoom,
            coupon,
            perks,
            numOfBed,
            maxGuests,
            checkIn, 
            checkOut,
            price,
            ratings,
            countInStock
        } = req.body;
        try {
            room.title = title || room.title;
            room.description = description || room.description;
            room.typeRoom = typeRoom || room.typeRoom;
            room.coupon = coupon || room.coupon;
            room.perks = perks || room.perks;
            room.numOfBed = numOfBed || room.numOfBed;
            room.maxGuests = maxGuests || room.maxGuests;
            room.checkIn = checkIn || room.checkIn;
            room.checkOut = checkOut || room.checkOut;
            room.price = price || room.price;
            room.ratings = ratings || room.ratings;
            room.countInStock = countInStock || room.countInStock;
            const updatedRoom = await room.save();
            res.status(200).json(updatedRoom);
        } catch (error) {
            res.status(500).json(error);
        }
    }

};

module.exports = roomControllers