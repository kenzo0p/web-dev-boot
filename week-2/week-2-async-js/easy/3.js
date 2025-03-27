const fs = require("fs");

function setTimeoutSync(resolve, reject) {
  setTimeout(() => {
    fs.readFile("1-counte.md", "utf-8", function (err, data) {
      if (err) {
        reject();
      } else {
        resolve(data);
      }
    });
  }, 2000);
}

let p = new Promise(setTimeoutSync);

function callback(data) {
  console.log(data);
}
function errCallback(err) {
  console.log("Erro hain re");
}
p.then(callback).catch(errCallback);



// some expensive operation



function readFilePromise() {
    return new Promise((resolve, reject) => {
        fs.readFile("1-counter.md", "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function expensiveOperation() {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) { // Making the operation more expensive
        sum += i;
    }
    console.log("Expensive operation done:", sum);
}

readFilePromise()
    .then((data) => {
        console.log("File Contents:", data);
    })
    .catch(() => {
        console.log("Error hain re");
    });

expensiveOperation();

