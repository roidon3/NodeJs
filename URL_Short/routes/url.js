const express=require("express");
const{handleGenerateNewUrlShortner}=require("../controller/url")
const router = express.Router();
router.post("/",handleGenerateNewUrlShortner)

module.exports=router;