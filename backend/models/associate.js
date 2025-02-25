const Review = require("./review");
const Product = require("./Product");
const User = require("./user");
const Category = require("./Category");
const ProductType = require("./ProductType");
const Feedback = require("./feedback");

Product.hasMany(Review, {
  foreignKey: "product_id",
  as: "reviews",
});

Review.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

Review.belongsTo(User, {
  foreignKey: "user_id", // Foreign key in Review table
  as: "user",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});
Product.belongsTo(ProductType, {
  foreignKey: "product_type_id",
  as: "producttype",
});

// Category model associations
Category.hasMany(Product, {
  foreignKey: "category_id",
  as: "products",
});

// ProductType model associations
ProductType.hasMany(Product, {
  foreignKey: "product_type_id",
  as: "products",
});
Feedback.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Feedback, { foreignKey: "user_id", as: "feedbacks" });

module.exports = { Product, Review, User, ProductType, Category };
