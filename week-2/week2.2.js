const fs = require("fs");

// function logName(){
//     console.log("om")
// }

// setTimeout( logName,  3000); //callback version

// function setTimeoutPromisified(ms){
//     return new Promise(resolve  => setTimeout(resolve , ms));
// }

// function callBack(){
//     console.log("3 seconds have passed")
// }

// let  p = setTimeoutPromisified(3000).then(callBack).catch("Somthing went wrong");//promisifieb versione

// console.log(p)

// function waitFor3s(resolve){
//     console.log(resolve);
//     setTimeout(resolve , 3000);
// }

// function main(){
//     console.log("main is called");
// }
// waitFor3s(main)

// function random(resolve){
//     setTimeout(resolve , 3000)
// }

// let  p =new Promise(random);

// function callback(){
//     console.log("Promise succeded");
// }
// p.then(callback)

//create a promisified version fs.readFile and fs.writeFile

// function readFileAsync(filePath, encoding = 'utf-8') {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, encoding, (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }

// function writeFileAsync(filePath, data) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(filePath, data, (err) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve('File written successfully');
//             }
//         });
//     });
// }

// // Usage example
// readFileAsync('a.txt')
//     .then((data) => {
//         console.log('File content:', data.trim());
//         return writeFileAsync('b.txt', data.trim());
//     })
//     .then(() => {
//         console.log('File written successfully');
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });







//harkirats code

// console.log("Start the file");
// function readTheFile(resolve) {
//   console.log("Read the file");
//   fs.readFile("a.txt", "utf-8", function (err, data) {
//     console.log("resolve");
//     resolve(data.trim());
//   });
// }

// function readFile(fileName) {
//   console.log("read the file");
//   return new Promise(readTheFile); //when you are creating a prmomise give the function that is doing the asyn opeation
// }

// const p1 = readFile();
// function callback(data) {
//   console.log("final");
//   //   console.log(data);.
// }

// p1.then(callback);
// console.log("end");





class Promise2 {
  constructor(fn) {
    this.fn = fn;
    this.fn(() => {
      this.resolve();
    });
  }
  then(callback) {
    this.resolve = callback;
  }
}



function readTheFile(resolve){
    setTimeout(() => {
        console.log("callback based setTimeout completed")
        resolve();

    } , 3000)
}

function setTimeoutPromisified2(){
    return new Promise2(readTheFile);
}
let  p = setTimeoutPromisified2();
function callBack(){

    
    console.log("Callback has been called")
}

p.then(callBack)
