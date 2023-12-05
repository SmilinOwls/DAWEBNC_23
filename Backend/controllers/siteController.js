const Site = require("../models/Sites");

const siteControllers = {
    createSite: async(req, res) => {
        const newSite = await Site(req.body);
        try {
            const savedSite = await newSite.save();
            res.status(200).json(savedSite);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllSites: async (req, res) => {
        try {
            const site = await Site.find();
            res.status(200).json(site);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getSiteById: async(req, res) => {
        try {
            const site = await Site.findById(req.params.id);
            if(!site){
                return res.status(404).json({
                    success: false,
                    message: "Site not found !!!"
                })
            }
            res.status(200).json(site);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteSite: async(req, res) => {
        const site = await  Site.findById(req.params.id);
        if(!site){
            return res.status(404).json({
                success: false,
                message: "Site not found !!!"
            })
        }
        try {
            await site.remove();
            return res.status(200).json({
                success: true,
                message: "Site has been deleted successfully"
            })
        } catch (error) {
            console.log(error)
        }
    },
    uploadTitleNews: async(req, res) => {
        const {file} = req;
        const urlImage = `${file.path}`;
      try{
        res.status(200).json({
          newsPic: urlImage
        });
      }catch(error){
          res.status(500).json(error);
       }
    }

};

module.exports = siteControllers;