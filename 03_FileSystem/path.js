import path from "path";

let myPath = "D:\\GIthub Repo's\\Backend-JS\\03_FileSystemsafi.txt";

console.log(path.extname(myPath)); // File Extension Name
console.log(path.basename(myPath)); // File Base Name
console.log(path.dirname(myPath)); // File Directory Name
console.log(path.join("c:/", "programs\\safi.txt")); // Will Join and Fix automatically