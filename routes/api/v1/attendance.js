const express = require("express");
const router = express.Router();
const {verifyUser} = require("../../../utils/verifyUser.js");
const attendanceController = require("../../../controllers/attendanceController.js");


router.get("/test", (req,res)=>{
    res.status(200).send({message : "The backend is working fine!"})
});
router.get("/get-attendance/:id", verifyUser, attendanceController.getAttendance)
router.post("/post-attendance/:id",verifyUser, attendanceController.addAttendance );
router.post("/update-attendance/:id", verifyUser, attendanceController.updateAttendance)


module.exports = router;