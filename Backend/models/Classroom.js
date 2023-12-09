const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "TEACHER",
  },
  subject: {
    type: String,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    required: true,
  },
});

const classroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: [String],
    description: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
    },
    categoryCode: {
      type: String,
      required: true,
    },
    students: [studentSchema],
    teachers: [teacherSchema],
    createdUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("classroom", classroomSchema);
