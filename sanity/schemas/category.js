// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "banner",
      title: "Banner",
      type: "image",
      of: [{ type: "reference", to: [{ type: "banner" }] }], // Reference to the category schema
    },
  ],
};
