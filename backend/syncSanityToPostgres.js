// const client = require("./sanityClient");

// const Product = require("./models/Product"); // Sequelize Product model

// // Fetch products from Sanity and sync them to PostgreSQL
// async function syncSanityToPostgres() {
//   try {
//     // Fetch all products from Sanity
//     const sanityProducts = await client.fetch('*[_type == "product"] ');

//     // Iterate over each product and insert/update in PostgreSQL
//     for (const sanityProduct of sanityProducts) {
//       const { _id, product_name, features } = sanityProduct;
//       // console.log("product_name", name);

//       // Insert or update product in PostgreSQL
//       await Product.upsert({
//         id: _id,
//         product_name: product_name,
//         features, // Features should already be in JSON format
//       });
//     }

//     console.log("Products synced successfully!");
//   } catch (error) {
//     console.error("Error syncing products:", error);
//   }
// }

// // Run the sync function
// syncSanityToPostgres();

const { client, urlFor } = require("./sanityClient");
const Product = require("./models/Product"); // Sequelize Product model

// Fetch products from Sanity and sync them to PostgreSQL
async function syncSanityToPostgres() {
  try {
    // Fetch all products from Sanity
    const sanityProducts = await client.fetch(
      '*[_type == "product"] | order(product_name asc)'
    );

    // Iterate over each product and insert/update in PostgreSQL
    for (const sanityProduct of sanityProducts) {
      const { _id, product_name, features } = sanityProduct;

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
      });
    }

    console.log("Products synced successfully!");
  } catch (error) {
    console.error("Error syncing products:", error);
  }
}

// Run the sync function
syncSanityToPostgres();
