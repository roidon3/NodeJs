//Node js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello from Node server");
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});


// const http = require("http");

// const server = http.createServer((req, res) => {

//     if (req.method === "GET") {
//         res.end("This is GET");
//     }

//     if (req.method === "POST") {
//         res.end("This is POST");
//     }

//     if (req.method === "PUT") {
//         res.end("This is PUT");
//     }

//     if (req.method === "DELETE") {
//         res.end("This is DELETE");
//     }
// });

// server.listen(8000, () => {
//     console.log("Server running on port 8000");
// });


//express js

// mkdir express-basic
// cd express-basic

// npm init -y

// express-basic/
// └── package.json

// npm install express

// express-basic/
// ├── node_modules/
// ├── package-lock.json
// ├── package.json
// └── index.js

const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from Express");
});

app.listen(8000, () => {
    console.log("Express server running on port 8000");
});