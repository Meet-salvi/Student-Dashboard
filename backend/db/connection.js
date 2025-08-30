const mongoose = require('mongoose');

async function connectDb() {
    try{
        const MONGO_URI = "mongodb://127.0.0.1:27017/student_attendance";
        await mongoose.connect(MONGO_URI).then(() => console.log("Database Connected"));

    }catch (err){
        console.log('Error Connecting MongoDB: ', err);
    }
}

module.exports = {
    connectDb
}