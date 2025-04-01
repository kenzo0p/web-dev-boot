// function add(a,b){
//     return a+b;
// }

// function mul(a,b){
//     return a*b;
// }
// console.log(add(2,3));
// console.log(mul(2,3));
// console.log(chalk.blue("Hellow world"));
// console.log(chalk.red.bold("There is an error"));
// console.log(chalk.green.underline("This is an success message"));
const { Command } = require("commander");
const fs = require("fs");
const program = new Command();

program
  .name("counter")
  .description("CLI to do file based tasks")
  .version("0.8.0");
program
  .command("count")
  .description("Count the number of lines in a file")
  .argument("<file>", "file to count")
  .action((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();

// function main(fileName){
//     fs.readFile(fileName ,"utf-8", function(err  , data){

//         let total = 0;
//         for(let i  =0;i<data.length;i++){
//             console.log(data)
//             if(data[i] === " "){
//                 total++;
//             }
//         }
//         console.log(total);
//     })
// }

// main("index.js")
