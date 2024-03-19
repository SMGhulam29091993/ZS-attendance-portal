const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/userController.js");
const { verifyUser } = require("../../../utils/verifyUser.js");
const uploadFile = require("../../../config/fileUpload-middlewar.js");

router.get("/test", (req,res)=>{
    res.status(200).send({message : "The backend is working fine!"})
});
router.post("/register", userController.register);
router.post("/sign-in", userController.create_session);
router.get("/sign-out", userController.destroySession);
router.put("/update-profile/:id", verifyUser,userController.updateUser )
router.post("/uploadImage/:id", uploadFile.single("file"), userController.uploadImage )
router.get("/get-image/:id", userController.getImage)

module.exports = router;