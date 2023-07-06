const todoSchema = require("../models/TodoSchema");

// Create todo
module.exports.addTodo = async (req, res) => {
    try {
        const { userId, text } = req.body;
        const todo = await todoSchema.create({ userId, text });
        res.status(201).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Creating Todo" });
    }
};

// Get toto
module.exports.getTodo = async (req, res) => {
    const { userId } = req.params;

    try {
        const todo = await todoSchema.find({ userId });
        res.status(200).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Getting Todo" });
    }
};

// Update todo
module.exports.updateTodo = async (req, res) => {
    try {
        const { _id } = req.params;
        const { text } = req.body;
        const todo = await todoSchema.findOneAndUpdate(
            { _id },
            { text },
            { new: true }
        );
        res.status(200).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Updating Todo" });
    }
};

// Delete todo
module.exports.deleteTodo = async (req, res) => {
    const { _id } = req.params;

    try {
        // Get todo by userId and delete
        await todoSchema.findOneAndDelete({ _id });
        res.status(200).json({ message: "Todo Deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Deleting Todo" });
    }
};
