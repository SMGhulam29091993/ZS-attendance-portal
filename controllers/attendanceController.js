const Attendance = require("../models/attendance.js");

module.exports.addAttendance = async (req,res,next)=>{
    userId = req.params.id;
    if(req.user.id !== userId){
        res.status(400).send({message : "You are not authorized for this..", success : false});
        return;
    }
    try {
        const attendance = await Attendance.find({userID : userId});
        if(attendance && attendance.date && attendance.status){
            res.status(201).send({message : "Attendance already marked want to update", success : false});
            return;
        }
        await Attendance.create(req.body);
        res.status(200).send({message : "Attendance has been markedt", success : true, })
        
    } catch (error) {
        next(error)
    }
};

module.exports.updateAttendance = async (req, res, next) => {
    const userId = req.params.id;
    if (req.user.id !== userId) {
        return res.status(400).json({ message: "You are not authorized for this.", success: false });
    }
    try {
        const attendance = await Attendance.findOne({ userID: userId, date: req.body.date });
        console.log(attendance._id)
        if (attendance) {
            attendance.status = req.body.status;
            await attendance.save();
            return res.status(200).json({ message: "Attendance updated successfully.", success: true, attendance });
        } else {
            return res.status(404).json({ message: "Attendance not found for the specified date.", success: false });
        }
    } catch (error) {
        next(error);
    }
};



module.exports.getAttendance = async (req, res, next) => {
    const userId = req.params.id; 
    if (req.user.id !== userId) {
        return res.status(400).json({ message: "You are not authorized for this.", success: false });
    }
    try {
        const attendance = await Attendance.find({ userID: userId }); 
        return res.status(200).json({ data: attendance, success: true, attendance });
    } catch (error) {
        next(error);
    }
};