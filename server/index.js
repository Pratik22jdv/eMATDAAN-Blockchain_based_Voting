const http = require("http");
const connectDB = require('./config/db.js');


//connect Database
connectDB();


  
// Creating Server
const server = http.createServer((req,res)=>{
    req.statusCode=200;
    console.log("Server is Started")
    res.end();
});
  
// Executing the server
server.listen(3000,"localhost",()=>{
    console.log("Server is Running ")
})