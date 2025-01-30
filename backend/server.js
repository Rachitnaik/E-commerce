require("dotenv").config(); // Load .env file
const express = require("express");
const sequelize = require("./config/database");
const {
  Product,
  Review,
  User,
  Category,
  ProductType,
} = require("./models/associate"); // Import models

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connected to PostgreSQL using Sequelize!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Routes
app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["category_name"], // Only fetch category_name
        },
        {
          model: ProductType,
          as: "producttype",
          attributes: ["product_type_name"], // Only fetch product_type_name
        },
      ],
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// In server.js
app.get("/products/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const product = await Product.findOne({
      where: { product_id },
      include: {
        model: Review,
        as: "reviews",
        attributes: ["review_id", "review_text", "review_date", "rating"],
        include: {
          model: User,
          as: "user",
          attributes: ["user_id", "firstname", "lastname", "phone", "email_id"],
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Return the product with its reviews
    res.json({
      product,
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
