const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const { Todo } = require("../database");
const router = Router();

// Create a new todo
router.post('/', adminMiddleware, async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        
        if (!title || !description || typeof completed !== "boolean") {
            return res.status(400).json({ message: "Title, description, and completed status are required" });
        }

        const newTodo = await Todo.create({ title, description, completed });

        return res.status(201).json(newTodo);
    } catch (error) {
        console.error("Error while creating the todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update a todo
router.put('/:id', adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        if (!title && !description && typeof completed !== "boolean") {
            return res.status(400).json({ message: "At least one field is required to update" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { $set: { title, description, completed } },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json(updatedTodo);
    } catch (error) {
        console.error("Error while updating the todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a specific todo by ID
router.delete('/:id', adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error while deleting todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get all todos
router.get('/', adminMiddleware, async (req, res) => {
    try {
        const todos = await Todo.find();

        if (todos.length === 0) {
            return res.status(404).json({ message: "No todos found" });
        }

        return res.status(200).json(todos);
    } catch (error) {
        console.error("Error while fetching todos:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get a specific todo by ID
router.get('/:id', adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json(todo);
    } catch (error) {
        console.error("Error while fetching todo by ID:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
