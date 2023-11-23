// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "background",
  title: "Background",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "img",
      title: "Img",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
