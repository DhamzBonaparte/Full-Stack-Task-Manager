const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    task:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        default:"pending"
    }
});

module.exports = mongoose.model("Task Manager Full Stack",schema);