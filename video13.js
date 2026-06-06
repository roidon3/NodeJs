const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express()
const fs = require("fs")
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // <-- add this
//These are the routes
app.get("/users", (req, res) => {
    const html = `
             <ul>
            <li>india</li>
            <li>australia</li>
            <li>england</li>
            <li>srilanka</li>

        </ul>
        `
    res.send(html)
})
//1.GET all the users
app.get("/api/users", (req, res) => {
    // return res.json(users)
    res.send(users)
})
//2.GET a particular user (GET element by ID)
//for dynamic path parameter use (:)
// api/users/:id
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    res.send(user)
})
//since we are using json data we can't create, upadte or delete the data
//if there is a common url like in out case (/api/users/:id)this is same for 3 routes so we can combine it
//app.route(url).get().put().delete()

//3.POST 
app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status:"Udercreated successfully",id:users.length})
    })
    console.log(body, "body paramaeters");

})
//4.PATCH 
app.patch("/api/users/:id",(req,res)=>{
         const id = Number(req.params.id);

})
//5.DELETE
app.delete("/api/users/:id",(req,res)=>{
     const id = Number(req.params.id);
     const user=users.filter((u)=>u.id !==id)
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err, data) => {
        return res.json({status:"User deleted successfully",id:id})
    })
    console.log(id, "body paramaeters");

})

app.listen(8000, () => console.log("conn is successfull"))