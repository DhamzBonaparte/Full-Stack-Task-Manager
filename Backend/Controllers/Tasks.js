const model = require("../Models/model");

const getAllTasks = async (req, res) => {
  try {
    const done = await model.find();
    res.status(200).json({ data: done });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const sendTask = async (req, res) => {
  try {
    const {task} = req.body;
    const done = await model.create({task:task});
    res.status(200).json({ data: done });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const {id}=req.params;
    const{task,date,status}=req.body;
    console.log(req.body);
    const upd = await model.findByIdAndUpdate(id,{
      task:task,date:date,status:status
    })
    console.log(upd);
    res.status(200).json({ msg: "updated Task" });
  } catch (error) {
    
  }
};

const deleteTask = async (req, res) => {
  try {
    const{id}=req.params;
    const del = await model.findByIdAndDelete(id);
    res.status(200).json({ data: del });
  } catch (err) {
     res.status(400).json({ msg: err });
  }
};

const getOneTask = async (req, res) => {
  try {
    const {id}=req.params;
    const task = await model.findById(id);
    res.status(200).json({ data: task });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

module.exports = { getAllTasks, sendTask, updateTask, deleteTask, getOneTask };
