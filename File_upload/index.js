const express = require("express");
const path = require("path")
const app = express();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}- ${file.originalname}`)
    }
})

const upload = multer({ storage: storage })
const PORT = 8000;
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
    return res.render("homepage")
})
app.post("/upload", upload.single("fileUploader"), (req, res) => {
    console.log(req.body, "req body")
    console.log(req.file, "req file")
    return res.redirect("/")

})
app.listen(PORT, () => console.log(`server running at port ${PORT}`))