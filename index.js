const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const dbconnection=require("./models/database");
const logger=require("./middleware/logger");
const UserRoutes=require("./routes/UserRoutes");



const port=3000;

app.use(express.json()); // converting the request from backend into json format
app.use(express.urlencoded({extended:true}));

//allowing request from frontend

try{
app.use(cors({
    origin:"http://localhost:5173",
    method:["GET,POST"]
})
);
}
catch(error){
console.error(error.message);

}

//for middleware
app.use(logger);

dbconnection();

app.get("/",(req,res)=>{
    res.send("Welcome");
    res.end();

});
// handing anu custom error
app.use((error, req, res, next) => {
    return res.status(500).json({ message: "internal server error " });
});
app.use((req,res,next)=>{
   console.log(req.body);
   next();

});
app.use("/users",UserRoutes);

app.listen(port,()=>{
    console.log("Server running on port:",port);
})
