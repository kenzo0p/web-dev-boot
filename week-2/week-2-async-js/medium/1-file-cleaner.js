const fs = require("fs")

let  p = fs.readFileSync("a.txt" , "utf-8");
console.log(p.replace(/\s\s+/g, ' '));