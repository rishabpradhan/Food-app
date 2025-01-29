// logic for connecting to the database

const mongoose=require("mongoose");

const dbconnection= async ()=>{
    try{
        await mongoose
            .connect("mongodb://127.0.0.1:27017/users")
            .then(()=>console.log("connection made successful"));
        return mongoose
    }
    catch(error){

        console.log("error while connecting",error.message);

    }
}
module.exports=dbconnection;