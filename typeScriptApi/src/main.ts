// function sumOfAge(user1: User, user2: User) {
//   return user1.age + user2.age;
// }

// const age = sumOfAge({ name: "Taro", age: 13 }, { name: "OM", age: 21 });
// console.log(age);

//TODO : Enum , generics , Pick  read about them

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  age?: string;
}
// interface updateProps{
//     name : string,
//     age : number,
//     password : string
// }

type UpdateProps = Pick<User, "name" | "email" | "age">; // picking those values we need
type UpdatePropsOptional = Partial<UpdateProps>; // ? optionally

const displayUserProfile = (user: UpdatePropsOptional) => {
  console.log(`name : ${user.name}  , email : ${user.email}`);
};

//readOnly used for endpints  so user cant update apiendpoint

type NewUser = {
  readonly name: string;
  readonly age: number;
};

const user : NewUser = {
  name: "om",
  age: 21,
};

// user.name = "pratik"; //error aas its readonly
