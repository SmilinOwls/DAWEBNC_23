const Classroom = require("../models/Classroom");
const ApiFeature = require("../utils/ApiFeature");

const classController = {
  createClass: async (req, res) => {
    const newClass = new Classroom({
      ...req.body,
    });
    try {
      const savedClass = await newClass.save();
      res.status(200).json(savedClass);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllClasses: async (req, res) => {
    try {
      const apiFeature = new ApiFeature(Classroom.find(), req.query)
        .search()
        .filter();
      let classroom = await apiFeature.query;
      res.status(200).json(classroom);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getClassById: async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.id);
      if (!classroom) {
        return res.status(404).json({
          success: false,
          message: "Classroom not found !!!",
        });
      }
      res.status(200).json(classroom);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteClass: async (req, res) => {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found !!!",
      });
    }
    try {
      await classroom.remove();
      return res.status(200).json({
        success: true,
        message: "Classroom has been deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateClass: async (req, res) => {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found !!!",
      });
    }
    try {
      const {
        name,
        image,
        description,
        ratings,
        categoryCode,
        students,
        teachers,
      } = req.body;
      classroom.name = name || classroom.name;
      classroom.image = image || classroom.image;
      classroom.description = description || classroom.description;
      classroom.ratings = ratings || classroom.ratings;
      classroom.categoryCode = categoryCode || classroom.categoryCode;
      classroom.students = students || classroom.students;
      classroom.teachers = teachers || classroom.teachers;
      const updatedClass = await classroom.save();
      res.status(200).json(updatedClass);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = classController;
