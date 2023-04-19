const mongoose = require('mongoose');

const DB_URI='mongodb://Databse1234:Databse1234@ac-gdkgmhl-shard-00-00.x5qhv5g.mongodb.net:27017,ac-gdkgmhl-shard-00-01.x5qhv5g.mongodb.net:27017,ac-gdkgmhl-shard-00-02.x5qhv5g.mongodb.net:27017/?ssl=true&replicaSet=atlas-sfb9pe-shard-0&authSource=admin&retryWrites=true&w=majority';

const connectDB = async()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log("Databse connected");
    }catch(error){
        console.log(error.message);
    }
}

module.exports= connectDB;