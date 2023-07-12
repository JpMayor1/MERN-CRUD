const userSchema = require("../models/UserSchema");

module.exports.getUserInfo = async (req, res) => {
    const {username} = req.params;
    try {
        const user = await userSchema.findOne({ username });
        if (user) {
            const todoId = user.todoId;
            res.status(200).json(todoId);
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error Getting Users Info" });
    }
};
