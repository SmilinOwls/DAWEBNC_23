const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  fullname: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  address: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "TEACHER",
  },
  subject: {
    type: String,
  },
});

const studentSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  fullname: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  address: {
    type: String,
    default: "",
  },
  email: {
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
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("classroom", classroomSchema);
