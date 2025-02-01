const User=require("../models/userSchema");
const jwt = require("jsonwebtoken");
const private_key="8b2f1300b5aef6e35f0a0b5bafd6ec253ae19b08e14e1809aad4631cafb2895b";
require("dotenv").config();
// user login
const loginUser=async(req, res) => {
    try{

        const {email, password} = req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"user does not exist"});
        }
        if(user.password!==password){
            return res.status(401).json({message:"password is incorrect"});
        }
        // generate token
        const token=jwt.sign({userId:user._id,email:user.email},private_key,{expiresIn:"1hr"});
        return res.status(200).json({message:"Authentication successfull"});


    }
    catch(err){
        console.log("could not authenticate",err.message);
        return res.status(401).send("Authentication failed").end();

    }

};
module.exports=loginUser;