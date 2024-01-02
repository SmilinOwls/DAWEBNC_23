const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
    grade: {
        type: Number,
        required: true,
    },
    assignmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "Assignment",
        required: true, 
    },
    studentId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
},  { timestamps: true });

module.exports = mongoose.model("Grade", gradeSchema);