const express = require("express");
const router = express.Router();

router.get("/test", (req,res)=>{
    res.status(200).send({message : "The backend is working fine!"})
});
router.use("/user", require("./user"));

module.exports = router;