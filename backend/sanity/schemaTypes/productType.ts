

import { defineField } from "sanity";
export const productType = defineField({
    name: 'productType',
    title: 'Product Type',
    type: 'document',
    fields: [
      {
        name: 'product_type_name',
        title: 'Product Type',
        type: 'string',
        validation: Rule => Rule.required().min(2).max(100), 
      },
    ],
  });
  