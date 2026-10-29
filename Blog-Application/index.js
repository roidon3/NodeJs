const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

const userRoute = require("./routes/user");
const { connectToMongoDB } = require("./connection");

const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.get("/", (req, res) => {
    return res.render("home");
});

app.use("/user", userRoute);

async function startServer() {
    try {
        await connectToMongoDB("mongodb://127.0.0.1:27017/blogify");
        console.log("MongoDB is connected");
        app.listen(PORT, () => {
            console.log(`App is running successfully on port: ${PORT}`);
        });
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
}

startServer();