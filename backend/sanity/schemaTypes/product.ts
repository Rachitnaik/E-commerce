import { defineField } from "sanity";

export const product = defineField({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "product_name",
      title: "Product Name",
      type: "string",
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "size",
              title: "Size",
              type: "string",
            },
            {
              name: "color",
              title: "Color",
              type: "string",
            },
            {
              name: "image",
              title: "Image",
              type: "image",
            },
            {
              name: "isDefault",
              title: "Is Default",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
    },
    {
      name:"category",
      title:"category",
      type:"reference",
      to: [{ type: "category" }],
    },
    {
      name:"productType",
      title:"productType",
      type:"reference",
      to: [{ type: "productType" }],
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
});
