const fs = require("fs")


console.log(fs.readFileSync("1-counter.md" , "utf-8"));

fs.writeFileSync("1-counter.md" , "Hii i am om")

console.log(fs.readFileSync("1-counter.md" , "utf-8"));
