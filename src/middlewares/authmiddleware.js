const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(' ')[1];
     
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }
        jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: "Unauthorized: Invalid token" });
            }
            req.user = decoded; 
            next(); 
        });
    } catch (error) {
        console.error("Error in verifyToken middleware:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
module.exports = verifyToken;
      


       

            
