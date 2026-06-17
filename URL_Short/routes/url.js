const express=require("express");
const{handleGenerateNewUrlShortner,handleAnalytics}=require("../controller/url")
const router = express.Router();
router.post("/",handleGenerateNewUrlShortner)
router.get("/analytics/:shortId",handleAnalytics)

module.exports=router;