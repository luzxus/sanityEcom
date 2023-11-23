// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [ //here we define what fields as objects which we want our product model to have
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }], //an array of (type) image
      options: {
        hotspot: true, //possibility to crop our images
      },
    },
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
        source: "name", //will auto generate a unique slug based on our name property
        maxLength: 90,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
  ],
};
