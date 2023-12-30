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
  profilePic: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "TEACHER",
  },
  subject: {
    type: String,
  },
  isInvited: {
    type: Boolean,
    default: false,
  },
  isJoined: {
    type: Boolean,
    default: false,
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
  profilePic: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "STUDENT",
  },
  isInvited: {
    type: Boolean,
    default: false,
  },
  isJoined: {
    type: Boolean,
    default: false,
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
    invitationCode: {
      type: String,
      default: Math.random().toString(36).slice(2, Math.floor(Math.random() * 3) + 7),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classroom", classroomSchema);
