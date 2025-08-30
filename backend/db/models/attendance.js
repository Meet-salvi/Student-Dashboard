const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  date: {
    type: Date,
    required: true,
      default: () => {
        const now = new Date();
        return new Date(now.getTime() + (5.5 * 60 * 60 * 1000)); // IST is 5h30 mins forward
      }
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    required: true
  }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
