const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollno: {
    type: String,
    required: true,
    unique: true
  },
  studentClass: {
    type: String,
    required: true
  },

}, {
  timestamps: true
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
