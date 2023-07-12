const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        todoId: { type: String, required: true },
        text: { type: String, required: true },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
