/* eslint-disable import/no-anonymous-default-export */
export default {
    name: 'contact',
    title: 'Contact',
    type: 'document',
    fields: [
        {
            name: 'company',
            title: 'Company or name',
            type: 'string',
        },
        {
            name: "adress", title: "Adress", type: "document", fields: [
                { name: "street", title: "Street", type: 'string' },
                { name: "zipcode", title: "Zip code", type: 'string' },
                { name: "city", title: "City", type: 'string' },

            ]
        },
        { name: "email", title: "Email", type: "string" },
        { name: "phone", title: "Phone", type: "string" },

    ]
}


