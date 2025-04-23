let x: number = 1;
console.log(x);

function hello(name: string) {
  console.log("Hii " + name);
}

// console.log(hello("om"));

function sum(a: number, b: number) {
  return a + b;
}

function isLegal(age: number) {
  if (age > 18) {
    return true;
  } else {
    return false;
  }
}

function delayedCall(anotherFn: () => void) {
  setTimeout(anotherFn, 1000);
}

function log() {
  console.log("Hi there");
}

console.log(delayedCall(log));

function greet(user: { name: string; age: number }) {
  console.log("hello" + user.name);
}

greet({ name: "om", age: 18 });

interface UserType {
  firstname: string;
  lastname: string;
  age: number;
}

type User = {
  name: string;
  age: number;
};

function greet1(user: UserType) {}
let User: UserType = {
  firstname: "om",
  lastname: "bhor",
  age: 21,
};

interface Manager {
  name: string;
  age: number;
}

interface Employee {
  name: string;
  department: string;
}

type TeamLead = Manager & Employee;

let t: TeamLead = {
  name: "om",
  age: 12,
  department: "manager",
};


