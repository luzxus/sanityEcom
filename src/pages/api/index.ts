import { GetServerSidePropsResult, GetStaticPropsResult } from "next";
import { client } from "../../../sanity/lib/client";
import { cache } from "react";

type HomeProps = {
  bannerData: any[];
  products: any[];
  images: any[];
};
//export const revalidate = 3600 kolla igen efter 3600sekunder
export const fetchData = async () => {
  const query = '*[_type == "product"]'; //grab all products from sanity
  const products = await client.fetch(query);

  const banner = '*[_type == "banner"]'; //grab all products from sanity
  const bannerData = await client.fetch(banner);

  const imagesQuery = `*[_type == "background"]{
        _id,
        "imageUrl": img.asset->url,
      }`;

  const imageData = await client.fetch(imagesQuery);
  const data = {
    products: products,
    bannerData: bannerData,
    images: imageData,
  };
  return {
    props: data,
  };
};

export const fetchCategories = async () => {
  const categoryQuery = '*[_type == "category"]'; //grab all products from sanity
  const categories = await client.fetch(categoryQuery);

  const tagsQuery = '*[_type == "tags"]'; //grab all products from sanity
  const tags = await client.fetch(tagsQuery);

  const data = {
    categories,
    tags,
  };
  return {
    props: data,
  };
};

export const fetchProductsByCategory = async (category: string) => {
  const query = `*[_type == "product" && category->slug.current == $qc] {
    name,
    slug,
    price,
    details,
    discount,
    image,
    "category": category->slug.current,
    "tags": tags[]->name
  }`;

  const params = { qc: category }; // Define parameters object

  const result = await client.fetch(query, params); // Pass parameters to the fetch method

  const bannerQuery = `*[_type == "banner" && category._ref in *[_type == "category" && slug.current == $qc]._id][0]{
    buttonText,
      saleTime,
      largeText1,
      discount,
      midText,
      "bannerImageUrl":image.asset -> url
  }
  `;
  const banners = await client.fetch(bannerQuery, params);

  return {
    products: result,
    bannerData: banners,
  };
};

export const fetchTags = async () => {
  const query = `*[_type == "tag"]{
    "slug": slug.current
  }`;

  const data = await client.fetch(query);
  return {
    tags: data,
  };
};
export const fetchProductsByTags = async (category: string) => {
  console.log("category tag to fetch", category);
  const query = `*[_type == "product" && $qc in tags[] -> slug.current] {
    ...,
    "tags": tags[]->slug.current
  }
  `;

  const params = { qc: category }; // Define parameters object

  const result = await client.fetch(query, params); // Pass parameters to the fetch method

  return {
    tagProducts: result,
  };
};

export const fetchAboutData = async () => {
  const data = await client.fetch(`*[_type == "about"][0]{
    paragraph1,
    paragraph2,
    paragraph3,
    paragraph4,
    paragraph5,
    title,
    "imageUrl1": image1.asset -> url,
    "imageUrl2": image2.asset -> url,
    "imageUrl3": image3.asset -> url,
    paraTitle1,
    paraTitle2,
    paraTitle3,
    paraTitle4,
    paraTitle5,
  }`);
  return {
    data,
  };
};

export const fetchContactData = async () => {
  const data = await client.fetch('*[_type == "contact"][0]');

  return { data };
};
