const User = require("../models/user");
const bcrypt = require("bcrypt");   
const jwt = require("jsonwebtoken");


const register = async (req,res)=>{
const {email,password} = req.body;
const profileImage = req.file ? req.file.filename : null;
try {
    if(!email || !password){
        return res.status(400).json({msg:"please fill all the fields"});
    }
    const users  = await User.findOne({email});
    if(users) return res.status(409).json({msg:"user already exist with given email"});
    const hashpass = await bcrypt.hash(password,10);
    const newuser = await User.create({email,password:hashpass , profileImage});
    return res.status(200).json({msg:"user created successfully",newuser});

} catch (error) {
    return res.status(500).json({msg:error.message});
}   
 }


const login = async (req,res)=>{

    const {email,password} = req.body;
   try {
    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" }); 
    }
    const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ msg: "Invalid email or password" }); 
        }
    
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid email or password" }); 
        }
        
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET || "default_secret", 
            { expiresIn: "1h" }
        );
      
    return res.status(200).json({ msg:"Login successfull" , access_token:token , user:existingUser } );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An unexpected error occurred. Please try again later." });
  }
   
}




module.exports = {
    register,
    login,

};


