const mongoose = require('mongoose');

const DB_URI=  process.env.MONGO_URI;

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Databse connected");
    }catch(error){
        console.log(error.message);
    }
}

module.exports= connectDB;