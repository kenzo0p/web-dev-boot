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
function greet(user) {
    console.log("hello" + user.name);
}
greet({ name: "om", age: 18 });
function greet1(user) { }
let User = {
    firstname: "om",
    lastname: "bhor",
    age: 21,
};
let t = {
    name: "om",
    age: 12,
    department: "manager",
};
