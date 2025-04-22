"use strict";
let x = 1;
console.log(x);
function hello(name) {
    console.log("Hii " + name);
}
// console.log(hello("om"));
function sum(a, b) {
    return a + b;
}
function isLegal(age) {
    if (age > 18) {
        return true;
    }
    else {
        return false;
    }
}
function delayedCall(anotherFn) {
    setTimeout(anotherFn, 1000);
}
function log() {
    console.log("Hi there");
}
console.log(delayedCall(log));
let greet = () => console.log("Hii");
greet();
