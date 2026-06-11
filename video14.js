const express = require("express");
const app = express()
const fs = require("fs")
const mongoose = require("mongoose");
const { type } = require("os");
//make connection to DB
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1").then(() => console.log("mongose conn is established")).catch(err => console.log(err)
)
//first we need to do the schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String, required: true,
    },
    last_name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    job_title: { type: String },
    gender: { type: String },
}, { timestamps: true })
//now make a modal
const User = mongoose.model('user', userSchema)//here user is my colection name it'll conert user to users

app.use(express.urlencoded({ extended: false }));//This middleware is used to read form data sent from the client. else we'll get undefined

app.use(express.json()); // <-- add this
//Creating our own middleware
//this is my second middleware so here next becomes my first middleware(urlencoded)
app.use((req, res, next) => {
    console.log("hello from my second middleware");
    next()

})
//These are the Routes

//3.POST 
app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name) {
        return res.status(400).json({
            error: "First name is required"
        })
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender,

    })
    return res.json(201).json({ message: "success" })

})

//2.GET all the users
app.get("/api/users", async (req, res) => {
    const users = await User.find({})
    res.send(users)
})

//3.GET a particular user (GET element by ID)

app.get("/api/users/:id", async(req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ err: "user is not found" })
    }
    res.send(user)
})
//since we are using json data we can't create, upadte or delete the data
//if there is a common url like in out case (/api/users/:id)this is same for 3 routes so we can combine it
//app.route(url).get().put().delete()


//4.PATCH 
app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

})
//5.DELETE
app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.filter((u) => u.id !== id)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err, data) => {
        return res.json({ status: "User deleted successfully", id: id })
    })
    console.log(id, "body paramaeters");

})

app.listen(8000, () => console.log("conn is successfull"))