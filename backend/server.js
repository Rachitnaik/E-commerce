require("dotenv").config(); // Load .env file
const express = require("express");
const db = require("./config/database");
const Product = require("./models/Product"); // Import models

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Test database connection
(async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log("Connected to PostgreSQL using Sequelize!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Routes
app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
