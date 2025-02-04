require("dotenv").config(); // Load .env file
const express = require("express");
const db = require("./config/database");
const syncSanityToPostgres = require("./syncSanityToPostgres");
const {
  Product,
  Review,
  User,
  Category,
  ProductType,
} = require("./models/associate");
const Feedback = require("./models/feedback");

const { Op } = require("sequelize");
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

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((totalRating / reviews.length).toFixed(1)); // Rounded to 1 decimal
};

// Routes
app.get("/products", async (req, res) => {
  const { color, minPrice, maxPrice, categoryId, productTypeId, size } =
    req.query;

  try {
    syncSanityToPostgres();

    const filters = {};

    // Filter by price range (price is a direct field in the table)
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) filters.price[Op.lte] = parseFloat(maxPrice);
    }

    // Filter by category_id (direct field in the table)
    if (categoryId) {
      filters.category_id = categoryId;
    }

    // Filter by product_type_id (direct field in the table)
    if (productTypeId) {
      filters.product_type_id = productTypeId;
    }

    // Filter by size in features column (JSONB)
    if (size) {
      filters.features = {
        [Op.contains]: [{ size: size }],
      };
    }

    // Filter by color in features column (JSONB)
    if (color) {
      filters.features = {
        [Op.contains]: [{ color: color }],
      };
    }

    const totalProducts = await Product.count({ where: filters });

    // Fetch products based on the filters
    const products = await Product.findAll({
      where: filters,
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
        {
          model: Review,
          as: "reviews",
          attributes: ["rating"],
        },
      ],
    });

    // Filter features array on the response to only include the relevant feature
    const filteredProducts = products.map((product) => {
      const filteredFeatures = product.features.filter(
        (feature) =>
          (!size || feature.size.toLowerCase() === size.toLowerCase()) &&
          (!color || feature.color.toLowerCase() === color.toLowerCase())
      );

      return {
        ...product.toJSON(),
        description: product.description ?? "",
        features: filteredFeatures,
        averageRating: calculateAverageRating(product.reviews), // Include overall product rating
      };
    });

    res.json({
      total_products: totalProducts,
      products: filteredProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//on select of one product
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
      product: {
        ...product.toJSON(),
        description: product.description ?? "", // Replace null with an empty string
      },
      reviewCount: product.reviews.length,
      averageRating: calculateAverageRating(product.reviews),
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//feedback api

app.get("/feedback", async (req, res) => {
  const feedback = await Feedback.findAll();
  const count = await Feedback.count();

  if (!feedback) {
    return res.status(404).json({ error: "No Feedbacks" });
  }

  // Return the product with its reviews
  res.json({
    count,
    feedback,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
