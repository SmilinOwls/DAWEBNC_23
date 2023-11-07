const Place = require("../models/Places");
const Room = require("../models/Room");
const Site = require("../models/Sites")
const ApiFeature = require("../utils/ApiFeature")

const placeControllers = {
    createPlace: async(req, res) => {
        const newPlace = await Place(req.body);
        try {
            const savedPlace = await newPlace.save();
            res.status(200).json(savedPlace);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllPlaces: async(req, res) => {
        
        try {
            const apiFeature = new ApiFeature(Place.find(), req.query).search().filter();
            let place = await apiFeature.query;
            res.status(200).json(place);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getPlaceBySite: async (req, res) => {
        const site = await Site.findById(req.params.id);
        if(!site){
            return res.status(404).json({
                success: false,
                message: "Place not found !!!"
            })
        }
        try {
            const apiFeature = new ApiFeature(Place.find({sites: req.params.id}), req.query).search().filter();
            let site = await apiFeature.query;
            res.status(200).json(site);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchPlaceByName: async(req, res) => {
        try {
            const search = req.query.keyword || "";
            const product = await Place.find({name: {$regex: ".*"+search+".*", $options: "i"}});
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getPlaceById: async(req, res) => {
        try {
            const place = await Place.findById(req.params.id);
            if(!place){
                return res.status(404).json({
                    success: false,
                    message: "Place not found !!!"
                })
            }
            res.status(200).json(place);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updatePlace: async(req, res) => {
        const {
            name,
            address,
            description,
            extraInfo,
            placePic,
        } = req.body;
        const place = await Place.findById(req.params.id);
        if(!place){
            return res.status(404).json({
                success: false,
                message: "Place not found !!!"
            })
        }
        try {
            place.name = name || place.name;
            place.address = address || place.address;
            place.description = description || place.description;
            place.placePic = placePic || place.placePic;
            place.extraInfo = extraInfo || place.extraInfo;
            const updatedPlace = await place.save();
            res.status(200).json(updatedPlace);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deletePlace: async(req, res) => {
        const place = await Place.findById(req.params.id);
        if(!place){
            return res.status(404).json({
                success: false,
                message: "Place not found !!!"
            })
        }
        const room = await Room.find({place: req.params.id});
        if(room.length !== 0){
            return res.status(404).json({
                success: false,
                message: "Room not found !!!"
            })
        }
        
        try {
                await Room.deleteMany({place: req.params.id}, (err) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('Rooms of Restaurant deleted successfully');
                    }})

           
           
        } catch (error) {
            res.status(500).json(error);
        }

        try {
            await place.remove();
            return res.status(200).json({
                success: true,
                message: "Place has been deleted successfully"
            })
        } catch (error) {
            console.log(error)
        }
    },
    createPlaceReview: async(req, res) => {
        const rating = req.body.rating;
        const comment = req.body.comment
        const place = await Place.findById(req.params.id);
        if(place){
            const alreadyReview = place.reviews.find(
                (r) => r.user.toString() === req.user.id.toString()
              );
            if(alreadyReview){
                res.status(400).json("Place already reviewed !!!");
            }
            const review = {
                user: req.user.id,
                name: req.user.username,
                rating: rating,
                comment: comment
            };
            place.reviews.push(review);
            place.numReviews = place.reviews.length;
            let avg = 0;

             place.reviews.forEach((rev) => {
                avg += rev.rating;
            });
            if(place.reviews.length > 0){
               place.ratings = (avg / place.reviews.length).toFixed(2);
            }
            try {
                const updatedPlace = await place.save();
                res.status(200).json(updatedPlace);
            } catch (error) {
                res.status(500).json(error)
            }
        }else {
            res.status(404).json("Place not found !!!");
        }
    },
    getPlaceReview: async(req, res) => {
        const place = await Place.findById(req.query.id);
        if(!place){
            return res.status(404).json("Place not found !!!");
        }
        res.status(200).json({
            reviews: place.reviews
        })
    },
    deleteReview: async(req, res) => {
        const place = await Place.findById(req.query.id);
        if(!place){
            return res.status(404).json("Place not found !!!");
        }
        const reviews = place.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());
        let avg = 0;
        reviews.forEach((rev) => {
            avg += rev.rating;
        });
        let ratings = 0;

        if (reviews.length === 0) {
          ratings = 0;
        } else {
          ratings = (avg / reviews.length).toFixed(2);
        }
        const numReviews = reviews.length;
        try {
            await Place.findByIdAndUpdate(
                req.query.id,
                {
                  reviews,
                  ratings,
                  numReviews,
                },
                {
                  new: true,
                  runValidators: true,
                  useFindAndModify: false,
                }
            );
            res.status(200).json("Review has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    uploadImage: async(req, res) => {
        const {file} = req;
        const urlImage = `${file.path}`;
        try{
          res.status(200).json({
            placePic: urlImage
          });
        }catch(error){
            res.status(500).json(error);
         }
      }
}

module.exports = placeControllers