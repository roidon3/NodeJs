const http = require("http");
const fs=require("fs");
// const myServer = http.createServer((req,res)=>{
//     console.log(req.headers,"req");
//     res.end("hello tbhis is the end")
// })
//to run this server we need a port no 
//port is something like doors in a house so i have to decide on which door i need to run the server

// myServer.listen(8000,()=>{
//     console.log("server started");
// })
//here second parameter(arrow function) is optional
//in brower see localhost:8000

//now what i'll do is i'll make logs whenver the req is comming from the browser
const myServer = http.createServer((req,res)=>{
    const log =`${Date.now()} req recieved \n`;
    fs.appendFile("log.txt",log,(err,data)=>{
        res.end("This is the end")
    })
})
myServer.listen(8000,()=>{
    console.log("server started");
})