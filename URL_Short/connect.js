const mongoose = require("mongoose");

//make connection to DB
async function connectMongoDB(url) {
    return mongoose.connect(url)
}
module.exports={
    connectMongoDB,
}