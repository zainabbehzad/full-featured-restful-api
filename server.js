// server.js
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose
const movieRoutes = require("./routes/movieRoutes");

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Movies API!");
});

// Use movie routes
app.use("/api/movies", movieRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});