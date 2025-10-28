const express = require("express");
const routes = require("./Router/route");
const app = express();
const connect = require("./Database/connect");
const cors = require("cors");
// require("express-async-errors")
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((err,req,res,next)=>{
    console.error(err.message);
    res.status(400).json({error:err.message})
})

app.use("/api/tasks", routes);

const port = process.env.PORT || 3000; 
const url = process.env.MONGO_URI;

const start = () => {
  try {
    connect(url);
    app.listen(3000, () => {
      console.log(`Server started at ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
