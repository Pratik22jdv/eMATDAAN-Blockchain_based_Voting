const mongoose = require('mongoose');

const DB_URI='mongodb+srv://Databse1234:Databse1234@cluster0.x5qhv5g.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log("Databse connected");
    }catch(error){
        console.log(error.message);
    }
}

module.exports= connectDB;