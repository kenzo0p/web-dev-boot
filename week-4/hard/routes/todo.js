const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const { Todo } = require("../database");
const router = Router();

// todo Routes
router.post('/', adminMiddleware , async(req, res) => {
    // Implement todo creation logic
    try {
        const {title  , description , completed} = req.body;
        if(!title || !description || !completed){
            return res.status(400).json({message : "All fields are required"});
        }
        const newTodo = await Todo.create({
            title : title,
            description : description,
            completed :completed
        })
        if(!newTodo){
            return res.status(400).json({message : "Something went wrong"});
        }
        
    } catch (error) {
        console.log(error , "Error while creating the todo");
        return res.status(500).json("Internal server error");
    }
});

router.put('/', adminMiddleware, (req, res) => {
    //TODO : Implement update todo  logic

});

router.delete('/', adminMiddleware, (req, res) => {
    // Implement delete todo logic
});

router.delete('/:id', adminMiddleware, (req, res) => {
    // Implement delete todo by id logic
});


router.get('/', adminMiddleware, (req, res) => {
    // Implement fetching all todo logic
});

router.get('/:id', adminMiddleware, (req, res) => {
    // Implement fetching todo by id logic
});

module.exports = router;