const { client, urlFor } = require("./sanityClient");
const Product = require("./models/Product");
const Category = require("./models/Category");
const ProductType = require("./models/ProductType");

// Fetch products from Sanity and sync them to PostgreSQL
async function syncSanityToPostgres() {
  try {
    // Fetch all products from Sanity
    const sanityProducts = await client.fetch(
      '*[_type == "product"] | order(product_name asc)'
    );

    console.log("heyeyeyeyeyeyeyeyeyey", sanityProducts);

    const sanityCategories = await client.fetch('*[_type == "category"]');
    const sanityProductType = await client.fetch('*[_type == "productType"]');

    // Sync categories to PostgreSQL
    for (const category of sanityCategories) {
      const { _id, category_name } = category;

      // Insert or update category in PostgreSQL
      await Category.upsert({
        category_id: _id, // Use Sanity's `_id` as the unique identifier
        category_name: category_name,
      });
    }

    //for syncingproduct types
    for (const productType of sanityProductType) {
      const { _id, product_type_name } = productType;

      // Insert or update product type in PostgreSQL
      await ProductType.upsert({
        product_type_id: _id, // Use Sanity's `_id` as the unique identifier
        product_type_name: product_type_name,
      });
    }

    // Iterate over each product and insert/update in PostgreSQL
    for (const sanityProduct of sanityProducts) {
      const { _id, product_name, features, category, productType } =
        sanityProduct;

      // Process features to replace image references with image URLs
      const processedFeatures = features.map((feature) => ({
        ...feature,
        image: feature.image?.asset ? urlFor(feature.image.asset).url() : null, // Get the image URL from the asset reference
      }));

      // Insert or update product in PostgreSQL
      await Product.upsert({
        id: _id,
        product_name: product_name,
        features: processedFeatures, // Features with image URLs
        category_id: category?._ref,
        product_type_id: productType?._ref,
      });
    }

    console.log("Products synced successfully!");
  } catch (error) {
    console.error("Error syncing products:", error);
  }
}

// Run the sync function
syncSanityToPostgres();
