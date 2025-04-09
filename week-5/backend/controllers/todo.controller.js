import { Todo } from "../models/todo.model.js";

const createTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ message: "are bhai kya kar raha hain title to de 😅" });
    }
    const newTodo = await Todo.create({
      title,
      completed,
      user: req.userId,
    });
    if (!newTodo) {
      return res.status(400).json({ Message: "Something went wrong" });
    }
    return res.status(201).json(newTodo);
  } catch (error) {
    console.log(error, "Error while creatng a todo");
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: { title, completed } },
      { new: true, runValidators: true }
    );
    if (!updateTodo) {
      return res.status(400).json({ message: "something went wrong" });
    }
    return res
      .status(200)
      .json({ message: "Updated successfully", updateTodo });
  } catch (error) {
    console.log(error, "Error while updating the todo");
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.findByIdAndDelete(id);
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log("error while deleting the todo");
    return res.status(500).json({ message: "internal server error" });
  }
};

const getAllUserTodos = async (req, res) => {
  try {
    const todo = await Todo.find({user : req.userId});
    if (todo.length === 0) {
      return res.status(404).json({ message: "no todos created a todo" });
    }
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error, "errore while getting the users todos");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createTodo, updateTodo, deleteTodo, getAllUserTodos };
