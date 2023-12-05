const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/posts/blogs")
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

router.post("/upload-blog", upload.single("blogs"), blogController.uploadBlogs)

//Create blog
router.post("/admin", authMiddleware.authorizeRole, blogController.createBlog);

//Get all blogs
router.get("/", blogController.getAllBlogs);

//Get detail blog
router.get("/:id", blogController.getBlogById);

//Update blog
router.put("/admin/:id", authMiddleware.authorizeRole, blogController.updateBlog);

//Delete blog
router.delete("/admin/:id", authMiddleware.authorizeRole, blogController.deleteBlog);


module.exports = router