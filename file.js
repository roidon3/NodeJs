const file = require("fs")
//This will create a file and adds the text here sync means its a synchronous call
// file.writeFileSync("./test.txt","This is my first Node js file")
//This is async 
// file.writeFile("./test.txt","Hello world",(err)=>console.log(err))
// Whats the diff bw these 2

//How to read a file

const result = file.readFileSync("./readFile.txt","utf-8");
// console.log(result,"result");

// file.readFile("./readFile.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log(err,"error is");
//     }else{
//         console.log(result,"result is");
//     }
// });

//Append the content in the file
// file.appendFileSync("./test.txt","Successfull person")
//you can also copy the file using cpSync else delete the file using unlinksync

//The first diff is sync will return a result where as async requires a callBack
// 1. Sync vs Async in Simple Words
// ✅ Synchronous (Sync)
// Node will do one task at a time.
// It waits until the file operation finishes.
// Flow:
// Read file
// Wait until reading completes
// Store result
// Then execute next line

// ✅ Asynchronous (Async)
// Node will start the task and continue running other code.
// It does NOT wait.
// Flow:
// Start reading file
// Move to next line immediately
// "Done" prints first
// File result comes later
//event loop ex normal console.log prints first in async in sync one by one

// Why Async is preferred in Node.js?
// Because Node.js works on:
// Event Loop
// Node is designed for non-blocking I/O.
// Async operations allow Node to:
// handle many users
// process requests faster
// avoid blocking the main thread
const os = require("os");
// console.log(os.cpus().length,"os")//so i have 4 cpu's
