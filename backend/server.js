const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");
const mongoose = require("mongoose");

require("dotenv").config();

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected...')).catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

// Routes
app.use(userRoute);
app.use(todoRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
