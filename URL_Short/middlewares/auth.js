const {getUser}=require("../service/auth")
async function ristrictToLoggedInUsers(req,res,next){
    const userId= req.cookies.uid;

}
module.exports={
    ristrictToLoggedInUsers
}