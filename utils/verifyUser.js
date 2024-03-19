const jwt = require("jsonwebtoken");

module.exports.verifyUser = (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"){
        token = req.headers.authorization.split(' ')[1];
        console.log("Token : ", token);
    }else if(req.cookie.jwtToken){
        token = req.cookie.jwtToken;
        console.log("Token :", token);
    };
    if(!token){
        return res.status(404).send({message : "Unauthorized User", success: false})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
        if(err){
            console.error("Token Verification Error: ", err);
            res.status(402).send({message : "Unauthorized User", success : false});
            return;
        }
        req.user = user;
        console.log(`Decoded user : ${user}`);
        next();
    })
}