const Classroom = require("../models/Classroom");
const ApiFeature = require("../utils/ApiFeature");
const mailer = require("../services/mailer");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const classController = {
  createClass: async (req, res) => {
    const newClass = new Classroom({
      createdUser: req.user.id,
      ...req.body,
      teachers: [
        {
          accountId: req.user.id,
          fullname: req.user.username,
          email: req.user.email,
          profilePic: req.user.profilePic,
          isJoined: true,
        },
      ],
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
      const classroom = await Classroom.find({
        createdUser: req.user.id,
      });
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
  getAllParticipatedClass: async (req, res) => {
    try {
      const classroom = await Classroom.find({
        $or: [
          { createdUser: req.user.id },
          { teachers: { $elemMatch: { accountId: req.user.id } } },
          { students: { $elemMatch: { accountId: req.user.id } } },
        ],
      });
      console.log(classroom);
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
  checkClassJoined: async (req, res) => {
    try {
      const classroom = await Classroom.findOne({
        _id: req.params.id,
        $or: [
          { createdUser: req.user.id },
          {
            teachers: {
              $elemMatch: { accountId: req.user.id, isJoined: true },
            },
          },
          {
            students: {
              $elemMatch: { accountId: req.user.id, isJoined: true },
            },
          },
        ],
      });
      if (!classroom) {
        return res.status(200).json({
          joined: false,
          classroom: classroom,
        });
      }
      res.status(200).json({
        joined: true,
        classroom: classroom,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  joinClassViaCode: async (req, res) => {
    try {
      let classroom = await Classroom.findOne({
        _id: req.params.id,
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
          fullname: req.user.username,
          email: req.user.email,
          profilePic: req.user.profilePic,
          isJoined: true,
        };
        classroom.students.push(newStudent);
      } else if (!student.isJoined) {
        Classroom.findOneAndUpdate(
          {
            _id: req.body.id,
            students: { $elemMatch: { accountId: req.user.id } },
          },
          { $set: { "students.$.isJoined": true } },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
            }
            classroom = doc;
          }
        );
      }

      const updatedClass = await classroom.save();
      res.status(200).json(updatedClass);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  validateInvitationLink: async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.id);
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
      let classroom = await Classroom.findById(req.body.id);
      if (!classroom) {
        return res.status(404).json({
          success: false,
          message: "Classroom not found !!!",
        });
      }

      if (classroom.invitationCode !== req.body.code) {
        return res.status(401).json({
          success: false,
          message: "Invalid invitation code !!!",
        });
      }

      const student = classroom.students.find(
        (student) => student.accountId === req.user.id
      );

      if (!student) {
        const newStudent = {
          accountId: req.user.id,
          fullname: req.user.username,
          email: req.user.email,
          profilePic: req.user.profilePic,
          isJoined: true,
        };
        classroom.students.push(newStudent);
      } else if (!student.isJoined) {
        Classroom.findOneAndUpdate(
          {
            _id: req.body.id,
            students: { $elemMatch: { accountId: req.user.id } },
          },
          { $set: { "students.$.isJoined": true } },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
            }
            classroom = doc;
          }
        );
      }

      const updatedClass = await classroom.save();
      res.status(200).json(updatedClass);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  sendEmailInvitation: async (req, res) => {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found !!!",
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found !!!",
      });
    }

    const newAccount = {
      accountId: user.id,
      fullname: user.username,
      email: user.email,
      profilePic: user.profilePic,
      isInvited: true,
    };

    if (req.body.role == "TEACHER") {
      const teacher = await Classroom.findOne({
        _id: req.params.id,
        teachers: { $elemMatch: { email: req.body.email } },
      });

      if (teacher) {
        return res.status(400).json({
          success: false,
          message: "User already joined or invited to this class !!!",
        });
      }

      classroom.teachers.push(newAccount);
      await classroom.save();
    } else if (req.body.role == "STUDENT") {
      const student = await Classroom.findOne({
        _id: req.params.id,
        students: { $elemMatch: { email: req.body.email } },
      });

      if (student) {
        return res.status(400).json({
          success: false,
          message: "User already joined or invited to this class !!!",
        });
      }

      classroom.students.push(newAccount);
      await classroom.save();
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

    const subject = `ELearning - Lời mời tham gia lớp học: "${classroom.name}"`;
    const link = `https://elearning-g2i8.onrender.com/api/classroom/email/redirect?token=${token}`;

    const html = `
    <p>Chào bạn <b>${req.user.username}</b>,</p>
    <p>Bạn nhận được email này vì bạn đã được mời tham gia vào lớp học <b>${classroom.name}</b> trên hệ thống ELearning.</p>
    <p>Để tham gia vào lớp học, bạn vui lòng nhấn vào link bên dưới.</p>
    <a href="${link}">Chấp nhận lời mời</a>
    <p>Trân trọng,</p>
    <p>Elearning Team</p>
    `;
    try {
      await mailer.sendMail(req.body.email, subject, html);

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
      if (!decoded.classId || !decoded.role) {
        return res.status(401).json({
          success: false,
          message: "Invalid invitation link !!!",
        });
      }

      const classroom = await Classroom.findById(decoded.classId);
      if (!classroom) {
        return res.status(404).json({
          success: false,
          message: "Classroom not found !!!",
        });
      }

      res.redirect(
        `http://localhost:3000/classroom/invite/accept_token/${classroom._id}?token=${token}&role=${decoded.role}`
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },
  joinClassViaEmail: async (req, res) => {
    try {
      let classroom = await Classroom.findById(req.body.id);
      if (!classroom) {
        return res.status(404).json({
          success: false,
          message: "Classroom not found !!!",
        });
      }

      if (req.body.token) {
        const decoded = jwt.verify(req.body.token, process.env.MY_SECRETKEY);
        if (decoded.role === "STUDENT") {
          const student = await Classroom.findOne({
            _id: req.body.id,
            students: { $elemMatch: { accountId: req.user.id } },
          });

          if (!student) {
            const newStudent = {
              accountId: req.user.id,
              fullname: req.user.username,
              email: req.user.email,
              profilePic: req.user.profilePic,
              isJoined: true,
            };
            classroom.students.push(newStudent);
          } else if (!student.isJoined) {
            Classroom.findOneAndUpdate(
              {
                _id: req.body.id,
                students: { $elemMatch: { accountId: req.user.id } },
              },
              { $set: { "students.$.isJoined": true } },
              { new: true },
              (err, doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
                }
                classroom = doc;
              }
            );
          }
        } else if (decoded.role === "TEACHER") {
          const teacher = await Classroom.findOne({
            _id: req.body.id,
            teachers: { $elemMatch: { accountId: req.user.id } },
          });

          console.log(teacher);

          if (!teacher) {
            const newTeacher = {
              accountId: req.user.id,
              fullname: req.user.username,
              email: req.user.email,
              profilePic: req.user.profilePic,
              isJoined: true,
            };
            classroom.teachers.push(newTeacher);
            await classroom.save();
          } else if (!teacher.isJoined) {
            Classroom.findOneAndUpdate(
              {
                _id: req.body.id,
                teachers: { $elemMatch: { accountId: req.user.id } },
              },
              { $set: { "teachers.$.isJoined": true } },
              { new: true },
              (err, doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
                }
                classroom = doc;
              }
            );
          }
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
