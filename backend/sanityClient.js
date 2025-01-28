// // import { createClient } from "@sanity/client";
// const { createClient } = require("@sanity/client");

// const client = createClient({
//   projectId: "99i06wdo", // Replace with your Sanity project ID
//   dataset: "dummydata", // Replace with your dataset name
//   // apiVersion: "2023-01-01", // Replace with your preferred API version
//   useCdn: false,
// });

// module.exports = client;
const { createClient } = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");

const client = createClient({
  projectId: "99i06wdo", // Replace with your Sanity project ID
  dataset: "dummydata", // Replace with your dataset name
  useCdn: false, // Disable CDN to fetch the freshest data
});

const builder = imageUrlBuilder(client);

// Helper function to get the image URL
function urlFor(source) {
  return builder.image(source);
}

module.exports = { client, urlFor };
