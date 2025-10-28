const express = require("express");
const path = require("path");
const routes = require("./Router/route");
const app = express();
const connect = require("./Database/connect");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin:"task-manager-sulav.netlify.app",
  credentials:true
}));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

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
