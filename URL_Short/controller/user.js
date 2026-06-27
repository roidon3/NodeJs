const User = require("../models/user");
const {setUser}=require("../service/auth")
const{v4:uuidv4}=require("uuid")
async function handleSignUp(req, res) {
   const {name,email,password}=req.body;
   await User.create({
    name,email,password
   })
   return res.json({message:"user cretaed successfully"})

}
async function handleLogin(req,res){
    const{email,password}=req.body;
    let userexist=await User.findOne({email,password})
    console.log(userexist,"userexist");
    if(!userexist){
      return res.json("invalid credentials")
    }
    const sessionId=uuidv4()
    setUser(sessionId,userexist)
    res.cookie("uid",sessionId)
    res.json({message:"login is successfull",sessionId})


}
module.exports = {
    handleSignUp,handleLogin
};