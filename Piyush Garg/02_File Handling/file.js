const fs = require("fs");
const os = require("os");

console.log(os.cpus().length) // To view Theards

// Sync ---> Blocking Code
// Async ---> Non-Blocking Code

// Write File
    // fs.writeFile("safi.txt", "Safi is learning Node.js",  (err) => {})

// Read File
    // fs.readFile("safi.txt", (error, data)=> {
    //     console.log(data.toString())
    // })

// Append File
    // fs.appendFile("safi.txt", ".\nSafi is also learning MongoDB.", (err) => {});

// Copy File
    // fs.cpSync('safi.txt', './private/khan.txt')

// Delete File
    // fs.unlinkSync('./private/khan.txt')
