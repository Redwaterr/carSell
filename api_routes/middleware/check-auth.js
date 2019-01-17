const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization;  //Headerı alıp tokeni çözüp userdataya attık
        const decodeToken = jwt.verify(token,"secret_should_be_longer");
        req.userData = {email:decodeToken.email,userId:decodeToken.userId};
        next();
    } catch (err) {
        res.status(401).json({message:"Auth failed",err});
    };
};