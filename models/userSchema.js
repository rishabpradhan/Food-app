// defining the user schema

const mongoose =require("mongoose");



    const userschema=new mongoose.Schema({

        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true

        },
        contact:{
            type:String,
            required:true

        }
    });



const User=mongoose.model("users",userschema);
module.exports=User;





