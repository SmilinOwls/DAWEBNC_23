const placeControllers = require("../controllers/placeController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/images/restaurants")
    },
    filename: function(req, file, cb){
        cb(null,  Date.now() + "_" + file.originalname) // dặt lại tên cho file
    }
})
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        const extensionImageList = [".png", ".jpg", ".jpeg"];
        const extension = file.originalname.slice(-4);
        const check = extensionImageList.includes(extension);
        if(check){
            cb(null, true);
        }else{
            cb(new Error("extention không hợp lệ"))
        }
    }
});

router.post("/upload-image", upload.single('restaurant'), placeControllers.uploadImage);

// Create Place
router.post("/admin", authMiddleware.authorizeRole, placeControllers.createPlace);

// Get Place
router.get("/", placeControllers.getAllPlaces);
router.get("/:id", placeControllers.getPlaceById);

router.get("/site/:id", placeControllers.getPlaceBySite);

// Update Place
router.put("/admin/:id", authMiddleware.authorizeRole, placeControllers.updatePlace);

// Delete Place
router.delete("/admin/:id", authMiddleware.authorizeRole,  placeControllers.deletePlace);

//Create place reviews
router.post("/:id/review", authMiddleware.verifyToken, placeControllers.createPlaceReview);

// Get place review
router.get("/user/reviews", authMiddleware.verifyToken, placeControllers.getPlaceReview);

// Delete place review
router.delete("/user/review", authMiddleware.verifyToken, placeControllers.deleteReview);

//Search place
router.get("/name/search", placeControllers.searchPlaceByName);



module.exports = router;


