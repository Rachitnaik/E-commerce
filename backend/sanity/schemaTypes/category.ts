import { defineField } from "sanity";


export const category = defineField({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'category_name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100), // Validate category name
    },
  ],
});
