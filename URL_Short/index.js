const express = require("express");
const URL = require("./models/url");
const path=require("path")
const app = express();
const urlroute = require("./routes/url")
const { connectMongoDB } = require("./connect")
app.use(express.json()); // <-- add this
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
//connection
connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log("connection is successfull"));
app.use("/url", urlroute)

app.get("/test",async(req,res)=>{
    let info =await URL.find({})
    console.log(info,"info")
    // res.send(`<h1>{info[0].shortId}</h1>`)
    res.render("home",{urls:info})
})

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    console.log("Requested shortId:", shortId);
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now(),
                },
            },
        },
        { new: true }
    );

    console.log("Entry:", entry);

    if (!entry) {
        return res.status(404).json({
            error: "Short URL not found",
        });
    }

    res.redirect(`https://${entry.redirectUrl}`);
});

const port = 8000;
app.listen(port, () => console.log(`server started at ${port}`))
//last one is pending /analytics you need to pass the id it'll show howmany times user has visted that royute and its history