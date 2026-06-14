//Modefied after MVC
const express = require("express");
const app = express()

const userRouter = require("./routes/user")
const { connectMongoDB } = require("./connection")
//connection
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>console.log("connection is successfull"))

app.use(express.urlencoded({ extended: false }));//This middleware is used to read form data sent from the client. else we'll get undefined

app.use(express.json()); // <-- add this
//Creating our own middleware
//this is my second middleware so here next becomes my first middleware(urlencoded)
app.use((req, res, next) => {
    console.log("hello from my second middleware");
    next()

})
//Routes
app.use("/api/users", userRouter)

app.listen(8000, () => console.log("conn is successfull"))









//Actuall stuff without MVC
// const express = require("express");
// const app = express()
// const mongoose = require("mongoose");
// //make connection to DB
// mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1").then(() => console.log("mongose conn is established")).catch(err => console.log(err)
// )
// //first we need to do the schema
// const userSchema = new mongoose.Schema({
//     first_name: {
//         type: String, required: true,
//     },
//     last_name: { type: String, required: false },
//     email: { type: String, required: false, unique: true },
//     job_title: { type: String },
//     gender: { type: String },
// }, { timestamps: true })
// //now make a modal
// const User = mongoose.model('user', userSchema)//here user is my colection name it'll conert user to users

// app.use(express.urlencoded({ extended: false }));//This middleware is used to read form data sent from the client. else we'll get undefined

// app.use(express.json()); // <-- add this
// //Creating our own middleware
// //this is my second middleware so here next becomes my first middleware(urlencoded)
// app.use((req, res, next) => {
//     console.log("hello from my second middleware");
//     next()

// })
// //These are the Routes
// //1.POST
// app.post("/api/users", async (req, res) => {
//     const body = req.body;
//     if (!body || !body.first_name) {
//         return res.status(400).json({
//             error: "First name is required"
//         })
//     }
//     const result = await User.create({
//         first_name: body.first_name,
//         last_name: body.last_name,
//         email: body.email,
//         job_title: body.job_title,
//         gender: body.gender,

//     })
//     return res.status(201).json({ message: "success", user: result })

// })

// //2.GET all the users
// app.get("/api/users", async (req, res) => {
//     const users = await User.find({})
//     res.send(users)
// })

// //3.GET a particular user (GET element by ID)
// app.get("/api/users/:id", async (req, res) => {
//     const user = await User.findById(req.params.id)
//     if (!user) {
//         return res.status(404).json({ err: "user is not found" })
//     }
//     res.send(user)
// })

// //4.DELETE
// app.delete("/api/users/:id", async (req, res) => {
//     const id = req.params.id;
//     await User.deleteOne({ _id: id })
//     return res.status(200).json({ err: "User deleted successfully" })
// })

// //5.PATCH
// app.patch("/api/users/:id", async (req, res) => {
    // const id = req.params.id;
    // const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true })
    // return res.json(updateUser);
// })

// app.listen(8000, () => console.log("conn is successfull"))