const Classroom = require("../models/Classroom");
const ApiFeature = require("../utils/ApiFeature");
const mailer = require("../services/mailer");
const jwt = require("jsonwebtoken");

const classController = {
  createClass: async (req, res) => {
    const newClass = new Classroom({
      createdUser: req.user.id,
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
  getClassByCreatedUser: async (req, res) => {
    try {
      const classroom = await Classroom.find({ createdUser: req.user.id });
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
  joinClassViaCode: async (req, res) => {
    try {
      const classroom = await Classroom.findOne({
        invitationCode: req.body.invitationCode,
      });

      if (!classroom) {
        return res.status(404).json({
          success: false,
          message: "Classroom not found !!!",
        });
      }

      const student = classroom.students.find(
        (student) => student.accountId === req.user.id
      );

      if (!student) {
        const newStudent = {
          accountId: req.user.id,
          fullName: req.user.userName,
          email: req.user.email,
          isJoined: true,
        };
        classroom.students.push(newStudent);
      } else if (!student.isJoined) {
        classroom.students.pull({ accountId: req.user.id });
        classroom.students.push({ ...student, isJoined: true });
      }

      const updatedClass = await classroom.save();
      res.status(200).json(updatedClass);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  validateInvitationLink: async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.classId);
      if (!classroom) {
        return res.status(404).json({
          success: false,
          message: "Classroom not found !!!",
        });
      }
      if (classroom.invitationCode !== req.query.cjc) {
        return res.status(401).json({
          success: false,
          message: "Invalid invitation code !!!",
        });
      }
      res.status(200).json(classroom);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  joinClassViaInvitationLink: async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.classId);
      if (!classroom) {
        return res.status(404).json({
          success: false,
          message: "Classroom not found !!!",
        });
      }
      const student = classroom.students.find(
        (student) => student.accountId === req.user.id
      );

      if (!student) {
        const newStudent = {
          accountId: req.user.id,
          fullName: req.user.userName,
          email: req.user.email,
          isJoined: true,
        };
        classroom.students.push(newStudent);
      } else if (!student.isJoined) {
        classroom.students.pull({ accountId: req.user.id });
        classroom.students.push({ ...student, isJoined: true });
      }

      const updatedClass = await classroom.save();
      res.status(200).json(updatedClass);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  sendEmailInvitation: async (req, res) => {
    const classroom = await Classroom.findById(req.body.classId);
    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found !!!",
      });
    }
    const token = jwt.sign(
      {
        classId: classroom._id,
        role: req.body.role,
      },
      process.env.MY_SECRETKEY,
      {
        expiresIn: "3600s",
      }
    );

    const subject = `ELearning - Lời mời cùng dạy lớp học: "${classroom.name}"`;
    const link = `http://localhost:5000/api/classroom/email/redirect?token=${token}`;

    const html = `
    <h1>Chào bạn ${req.user.userName},</h1>
    <p>Bạn nhận được email này vì bạn đã được mời tham gia vào lớp học <b>${classroom.name}</b> trên hệ thống ELearning.</p>
    <p>Để tham gia vào lớp học, bạn vui lòng nhấn vào link bên dưới.</p>
    <a href="${link}">Chấp nhận lời mời</a>
    <p>Trân trọng,</p>
    <p>ELearning Team</p>
    `;
    try {
      await mailer.sendMail(req.user.email, subject, html);
      res.status(200).json({
        success: true,
        message: "Send email successfully",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  validateEmailInvitationLink: async (req, res) => {
    try {
      const token = req.query.token;
      const decoded = jwt.verify(token, process.env.MY_SECRETKEY);
      const classroom = await Classroom.findById(decoded.classId);
      if (!classroom) {
        return res.status(404).json({
          success: false,
          message: "Classroom not found !!!",
        });
      }

      if (decoded.role === "student") {
        const student = classroom.students.find(
          (student) => student.accountId === req.user.id
        );

        if (!student) {
          const newStudent = {
            accountId: req.user.id,
            fullName: req.user.userName,
            email: req.user.email,
            isJoined: true,
          };
          classroom.students.push(newStudent);
        } else if (!student.isJoined) {
          classroom.students.pull({ accountId: req.user.id });
          classroom.students.push({ ...student, isJoined: true });
        }
      } else if (decoded.role === "teacher"){
        const teacher = classroom.teachers.find(
          (teacher) => teacher.accountId === req.user.id
        );

        if (!teacher) {
          const newTeacher = {
            accountId: req.user.id,
            fullName: req.user.userName,
            email: req.user.email,
            isJoined: true,
          };
          classroom.teachers.push(newTeacher);
        } else if (!teacher.isJoined) {
          classroom.teachers.pull({ accountId: req.user.id });
          classroom.teachers.push({ ...teacher, isJoined: true });
        }
      }

      const updatedClass = await classroom.save();
      res.status(200).json(updatedClass);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = classController;
