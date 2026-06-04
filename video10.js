const http = require("http");
const express = require("express");
const app = express()

app.get("/", (req, res) => {
    res.send("I'm from HomePage")
})

app.get("/about", (req, res) => {
    res.send("I'm from aboutUs page"+"hey"+req.query.name+"your age is"+req.query.age)
})
//Instead of this use app.listen
// const myServer = http.createServer(app)
// myServer.listen(8000, () => console.log("server started"))
app.listen(8000,()=>console.log("server started"))