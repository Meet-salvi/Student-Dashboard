const express = require('express');
const cors = require('cors');
const { connectDb } = require('./db/connection');
const Student = require('./db/models/student');
const Teacher = require('./db/models/teacher');
const Attendance = require('./db/models/attendance');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ message: "Success" });
});

// Login 
app.post('/api/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({ message: 'Please Enter all Fields' });
        }

        const emailRegex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(422).json({ message: "Please Enter Valid Email" });
        }

        const user = await Teacher.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isValidPassword = password === user.password;

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        return res.status(200).json({ message: 'Login Successfull' });


    } catch (err) {
        console.log('Error while Login: ', err);
        return res.status(500).json({ message: 'Server error' });
    }
})


// fetch all students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();

        if (students.length === 0) {
            return res.status(404).json({ message: "No Students Found" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        // Promise.all to fetch today's attendance for each student
        const studentsWithStatus = await Promise.all(
            students.map(async (student) => {
                const attendance = await Attendance.findOne({
                    student: student._id,
                    date: { $gte: today, $lt: tomorrow }
                });

                return {
                    _id: student._id,
                    name: student.name,
                    rollno: student.rollno,
                    studentClass: student.studentClass,
                    status: attendance ? attendance.status : "Not Marked"
                };
            })
        );



        return res.status(200).json({ message: "Success", students: studentsWithStatus });
    } catch (err) {
        console.log(" Error While fetching all students : ", err);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Add new student
app.post('/api/addstudent', async (req, res) => {
    try {
        const { name, rollno, studentClass } = req.body;

        if (!name || !rollno || !studentClass) {
            return res.status(404).json({ message: 'Please Enter all Fields' });
        }

        const newStudent = new Student({ name, rollno, studentClass });

        await newStudent.save();

        return res.status(201).json({ message: "New Student Added." });

    } catch (err) {
        console.log('Error while adding student : ', err);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Add New Teacher
app.post('/api/addteacher', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(404).json({ message: 'Please Enter all Fields' });
        }

        const emailRegex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(422).json({ message: "Please Enter Valid Email" });
        }

        // password validation
        if (password.length < 8) {
            return res.status(422).json({ message: "Password Must be 8 Characters long" });
        }

        const newTeacher = new Teacher({ name, email, password });

        await newTeacher.save();

        return res.status(201).json({ message: "New Teacher Added." });

    } catch (err) {
        console.log('Error while adding Teacher : ', err);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Attendance
app.post('/api/attendance', async (req, res) => {
  try {
    const { student_id, attendance_status } = req.body;

    // Get today's date range (start of today to start of tomorrow)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Check if attendance for this student already exists today
    let attendance = await Attendance.findOne({
      student: student_id,
      date: { $gte: today, $lt: tomorrow }
    });

    if (attendance) {
      // Update existing attendance
      attendance.status = attendance_status;
      await attendance.save();
      return res.status(200).json({ message: `Attendance Updated to ${attendance_status}` });
    } else {
      // Create new attendance
      attendance = new Attendance({
        student: student_id,
        status: attendance_status,
      });
      await attendance.save();
      return res.status(201).json({ message: `Attendance Marked as ${attendance_status}` });
    }

  } catch (err) {
    console.error("Error while marking attendance: ", err);
    return res.status(500).json({ message: "Server Error" });
  }
});


const port = 8000;
app.listen(port, () => {
    connectDb();
    console.log('Server started on ', port);
});