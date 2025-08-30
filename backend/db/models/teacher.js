const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, {
  timestamps: true
});

const Teacher = mongoose.model("teacher", teacherSchema);
module.exports = Teacher;
