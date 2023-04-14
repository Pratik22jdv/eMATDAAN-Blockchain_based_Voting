const express = require("express");
const http = require("http");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require('./config/db.js');
const userRouter = require('./routers/user');

dotenv.config();

//connect Database
connectDB();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
global.bodyParser = require('body-parser');

app.use("/users", userRouter);
  
  
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Backend server is running at " + port);
});
