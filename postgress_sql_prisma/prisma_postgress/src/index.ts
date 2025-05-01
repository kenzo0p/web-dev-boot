import { PrismaClient } from "@prisma/client";
import express from "express";
const client = new PrismaClient();

const app = express();

// async function createUser() {
//   const user = await client.users.findFirst({
//     where: {
//      id:1
//     },
//   });
//   console.log(user)
// }

// createUser();

app.get("/users", async (req, res) => {
  const users = await client.users.findMany();
  res.json({ users });
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const users = await client.users.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      todos: true,
      username : true,
      password:true
    },
  });

  res.json({users})
});

app.listen(3000)
