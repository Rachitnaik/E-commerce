

import { defineField } from "sanity";

export const productType = defineField({
    name: 'productType',
    title: 'Product Type',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Type Name',
        type: 'string',
        validation: Rule => Rule.required().min(2).max(100), // Validate type name
      },
    ],
  });
  