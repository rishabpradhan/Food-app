const logger=(req,res,next)=>{
    console.log(`${req.method} requested ${req.originalUrl}`);
    next(); // pass the control to the next function
}
module.exports = logger;