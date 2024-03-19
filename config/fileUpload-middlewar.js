const path = require("path");
const multer = require("multer");


const storageConfig = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, "uploads/profileImage/");
    },
    filename : (req,file,cb)=>{
        const name = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, name);
    }
})

const uploadFile = multer({
    storage : storageConfig
});

module.exports = uploadFile;