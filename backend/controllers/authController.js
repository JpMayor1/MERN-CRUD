const userSchema = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create User
module.exports.registerUser = async (req, res) => {
    try {
        // Get user data
        const { username, email, password, todoId } = req.body;

        // Check if user exists
        const userExist = await userSchema.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        const user = await userSchema.create({
            username,
            email,
            password: hashedPassword,
            todoId,
        });
        // Return user
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Registering User" });
    }
};

// Login User
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        const username = user.username;
        res.json({ token, username });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Logging In User" });
    }
};
