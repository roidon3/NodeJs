require('dotenv').config()
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { handleGetAllBlogs } = require("./controller/blog");
const { connectToMongoDB } = require("./connection");

const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.get("/", handleGetAllBlogs);

app.use("/user", userRoute);
app.use("/blog", blogRoute);

async function startServer() {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL is not set in the environment");
        }

        await connectToMongoDB(mongoUrl);
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