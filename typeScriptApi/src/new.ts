// type UserProp = {
//   id: string;
//   name: string;
// };

// type Users = {
//   [key: string]: UserProp;
// };

// const users: Users = {
//   "1": {
//     id: "1",
//     name: "om",
//   },
//   "2": {
//     id: " 2",
//     name: "pratik",
//   },
// };



//TODO : records and maps

type Users = Record<string , number>; //ts syntax for record

const users : Users = {
    "kfnb" : 21,
    "kfv" : 12
}


//map
type NewUserProp = {
    name :string,
    age : number
}
const newUser = new Map<string ,NewUserProp >(); //   creating a map

newUser.set("1" , {name : "om" , age : 21});
newUser.set("2" , {name : "pratik" , age : 22});
newUser.set("3" , {name : "om" , age : 21});

newUser.get("1"); // getting the value of key 1
newUser.get("2"); // getting the value of key 2


//Exclude
type UserType = "admin" | "user" | "superadmin";
type ExcludeUserType = Exclude<UserType , "admin">; // excluding admin from the type
const functionWithExclude = (user : ExcludeUserType) => {
    console.log(user);
}

functionWithExclude("user"); // user is allowed
functionWithExclude("superadmin"); // superadmin is allowed
functionWithExclude("admin"); // error as it is excluded from the type
functionWithExclude("admin" as ExcludeUserType); // type casting to ExcludeUserType