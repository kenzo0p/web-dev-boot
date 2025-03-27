const fs = require("fs");

// function sum(a , b){
//     return parseInt(a) + parseInt(b);
// }

// function sum1(n){
//     return (n * (n + 1)) / 2;
// }

// let ans = sum1(5);
// console.log(ans)//cpu bound task

// const fs = require("fs");
// console.log(fs);
// const content = fs.readFileSync('b.txt' , "utf8"); //i/o bound task -> synchronous
// console.log(content);
// const contents = fs.readFile("a.txt", "utf8");//asynchrnous
// console.log(contents);

// setTimeout(() => {
//     const content = fs.readFileSync('b.txt' , "utf8");
//     console.log(content);

// } , 2000)

// function sum(a,b){
//     return a+b;
// }
// function mul(a,b){
//     return a+b;
// }
// function div(a,b){
//     return a+b;
// }

// function doOperation(a,b, op){
//     return op(a,b);
// }

// console.log(doOperation(1,2 ,sum));

// fs.readFile("a.txt" , "utf8" , function(erro , data) {
//     console.log(data);
// })
// fs.readFile("b.txt" , "utf8" , function(erro , data) {
//     console.log(data);
// })

//async code and callback

// function read(err, data) {
//   if (err) {
//     console.log("File not found!");
//   } else {
//     console.log(data);
//   }
// }

// fs.readFile("b.txt", "utf-8", read);
// fs.readFile("a.txt", "utf-8", read);
console.log("done!");


setTimeout(() => {
    console.log("hii")
} , 1000)

let c = 0;
for(let i  = 0;i < 10000000000;i++){ //cpu intesive task it will print do first then setTimeout
    c+=1;
}

console.log("exp")