const userSchema = require("../models/UserSchema");
const bcrypt = require("bcrypt");

// Get All Users
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userSchema.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Getting All Users" });
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

        // Return user
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Logging In User" });
    }
};

// Create User
module.exports.registerUser = async (req, res) => {
    try {
        // Get user data
        const { username, email, password } = req.body;

        // Check if user exists
        const userExist = await userSchema.findOne({ email });
        if (userExist === email) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        const user = await userSchema.create({
            username,
            email,
            password: hashedPassword,
        });
        // Return user
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Registering User" });
    }
};

// Delete User
module.exports.deleteUser = async (req, res) => {
    try {
        // Get user id
        const { id } = req.params;
        // Delete user
        await userSchema.findByIdAndDelete(id);
        // Return message
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Deleting User" });
    }
};
