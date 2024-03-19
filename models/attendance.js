const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    userID : {
        type : String,
        require : true
    },
    date : {
        type : String,
        require : true
    },
    status : {
        type : String,
        require : true
    }
}, {timestamps : true});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;