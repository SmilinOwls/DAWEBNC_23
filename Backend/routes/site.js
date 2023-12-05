const siteControllers = require("../controllers/siteController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/posts/news")
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

router.post("/upload-news", upload.single("news"), siteControllers.uploadTitleNews);

// Create Site
router.post("/admin", authMiddleware.authorizeRole, siteControllers.createSite);

//Get all sites
router.get("/", siteControllers.getAllSites);

//Get detail site
router.get("/:id", siteControllers.getSiteById);

//Delete site
router.delete("/admin/:id", authMiddleware.authorizeRole, siteControllers.deleteSite)

module.exports = router;