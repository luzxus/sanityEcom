

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    name: "tag",
    title: "Tag",
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
    ],
}
