"use client";

import { Herobanner } from "@/components/HeroBanner";
import { FC, useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import { FooterBanner, HeroBanner, Product } from "../components/index";
//eftersom denna är skapad i root dir så blir detta våran / route sida
/* 
type HomeProps = {
  products: any;
  bannerData: Herobanner;
}; */

const fetchData = async () => {
  const query = '*[_type == "product"]'; //grab all products from sanity
  const products = await client.fetch(query);

  const banner = '*[_type == "banner"]'; //grab all products from sanity
  const bannerData = await client.fetch(banner);

  const imagesQuery = `*[_type == "background"]{
    _id,
    "imageUrl": img.asset->url,
  }`;

  //Här säger vi att vi vill hämta ut id:et och sen skapar vi upp en ny property som vi kallar för imageUrl somvi kombinerar med värdet från img.asset som har en referens till url
  //https://www.sanity.io/docs/array-type#wT47gyCx
  const imageData = await client.fetch(imagesQuery);
  const data = {
    products: products,
    bannerData: bannerData,
    images: imageData,
  };
  console.log("DATA", data);
  return data;
};
const Home = () => {
  const [productData, setProductData] = useState<any[]>();
  const [bannerData, setBannerData] = useState<any[]>();
  const [imageData, setImageData] =
    useState<{ imageUrl: string; _id: string }[]>();

  useEffect(() => {
    fetchData().then((res) => {
      setProductData(res.products);
      setBannerData(res.bannerData);
      setImageData(res.images);
      console.log("RES", res);
    });
  }, []);

  console.log("image baner", imageData);
  return (
    <div>
      <HeroBanner
        heroBanner={
          bannerData && bannerData?.length > 0 ? bannerData[0] : ({} as any)
        }
      />
      <div className="products-heading">
        <h2>Bäst säljande produkter</h2>
        <p>Talare av många variationer</p>
        <div className="products-container">
          {productData?.map((product: any) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </div>
      {imageData && imageData.length > 0 && (
        <FooterBanner footerBanner={imageData && imageData[0]} />
      )}
    </div>
  );
};

export default Home;
