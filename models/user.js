const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String, required: true,
    },
    last_name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    Job_title: { type: String },
    gender: { type: String },
}, { timestamps: true })

const User = mongoose.model('user', userSchema)
console.log(userSchema.obj,"lllllll");
module.exports=User