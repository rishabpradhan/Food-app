const express=require("express");
const router=express.Router();

const User = require("../models/userSchema"); // importing the user schema

router.post("/",async (req,res)=>{
    const {firstname,lastname,password,email,contact} = req.body;
    if(!firstname || !lastname|| !password || !email || !contact){
        return res.status(400).send("Please enter a required field");
    }
    try{
        const userResult= await User.create({
            firstname,
            lastname,
            password,
            email,
            contact,

        });
    console.log(userResult);
        return res.status(200).json({message:"Successfully created user"});
    }
    catch(err){
        return res.status(400).send(err.message);

    }
});
module.exports = router;