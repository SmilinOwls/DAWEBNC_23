const Blog = require("../models/Blog");

const blogControllers = {
    createBlog: async(req, res) => {
        const newBlog = await Blog(req.body);
        try {
            const savedBlog = await newBlog.save();
            res.status(200).json(savedBlog);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllBlogs: async(req, res) => {
        try {
            const blog = await Blog.find();
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getBlogById: async(req, res) => {
        try {
            const blog = await Blog.findById(req.params.id);
            if(!blog){
                return res.status(404).json({
                    success: false,
                    message: "Blog not found !!!"
                })
            }
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateBlog: async(req, res) => {
        const {
            title,
            fullText,
            image,
        } = req.body;
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({
                success: false,
                message: "Blog not found !!!"
            })
        }
        try {
            blog.title = title || blog.title;
            blog.fullText = fullText || blog.fullText;
            blog.image = image || blog.image
            const updatedBlog = await blog.save();
            res.status(200).json(updatedBlog);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteBlog: async (req,res) => {
        const blog = await  Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({
                success: false,
                message: "Blog not found !!!"
            })
        }
        try {
            await blog.remove();
            return res.status(200).json({
                success: true,
                message: "Room has been deleted successfully"
            })
        } catch (error) {
            console.log(error)
        }
    },

    uploadBlogs: (req, res) => {
        const {file} = req;
        const urlImage = `${file.path}`;
      try{
        res.status(200).json({
          blogPic: urlImage
        });
      }catch(error){
          res.status(500).json(error);
       }
    }

};

module.exports = blogControllers