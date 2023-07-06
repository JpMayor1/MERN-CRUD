const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        text: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
