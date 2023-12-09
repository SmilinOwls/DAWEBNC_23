const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    role: {
      type: ["TEACHER", "STUDENT"],
      default: "STUDENT",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    activatedToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    classroom: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Classroom",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
