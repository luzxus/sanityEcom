"use client";
import { fetchData } from "@/pages/api";
import { FooterBanner, HeroBanner, Product } from "../components/index";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useEffect, useMemo, useState } from "react";
import Carousel from "@/components/Carousel";
//eftersom denna är skapad i root dir så blir detta våran / route sida

const HomePage = () => {
  const [bannerData, setBannerData] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([] as any);

  const [productStartIndex, setProductStartIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window && window.innerWidth < 768 && setIsMobile(true);
  }, []);

  useEffect(() => {
    fetchData().then((res) => {
      setBannerData(res.props.bannerData);
      setImages(res.props.images);
      setProducts(res.props.products);
      setCurrentFourProducts(
        res.props.products.slice(0, products.length >= 4 ? 4 : products.length)
      );
    });
  }, [products.length]);

  const [currentFourProducts, setCurrentFourProducts] = useState<any[]>([]);

  console.log("current products", currentFourProducts);
  console.log("current index", productStartIndex);
  const handleNextProducts = () => {
    setProductStartIndex((prev) => prev + 1);

    const nextIndex = productStartIndex + 1;

    //om det finns fler produkter än nästkommande 4 index värden
    if (products.length >= nextIndex + 4) {
      setCurrentFourProducts(products.slice(nextIndex, nextIndex + 4));
    } else {
      // If there are fewer than 4 products remaining, you may want to adjust the logic.
      // Here, it repeats the products in a circular manner.
      const remainingProducts = products.length - nextIndex;
      const nextSetOfProducts = products.slice(
        nextIndex,
        nextIndex + remainingProducts
      );
      nextSetOfProducts.push(...products.slice(0, 4 - remainingProducts));

      if (nextSetOfProducts.length > 4) {
        setProductStartIndex(0);
        setCurrentFourProducts(nextSetOfProducts.slice(0, 4));
      } else {
        setCurrentFourProducts(nextSetOfProducts);
      }
    }
  };

  return (
    <>
      {!bannerData[0] || !products[0] ? (
        "loading"
      ) : (
        <div>
          <HeroBanner
            backgroundImage={images[0].imageUrl}
            heroBanner={
              bannerData && bannerData?.length > 0 ? bannerData[0] : ({} as any)
            }
          />
          <div className="products-heading">
            <h2>Våra produkter</h2>
            <p>Utvalda produkter från vårat sortiment</p>
            <div className="products-pagination-container">
              <div className="products-container">
                {!isMobile ? (
                  currentFourProducts?.map((product: any) => (
                    <div
                      className="product-arrow-container"
                      key={product._id.concat("container")}
                    >
                      <Product product={product} key={product._id} />
                      <div
                        className="nextArrow"
                        onClick={handleNextProducts}
                        onDrag={handleNextProducts}
                      >
                        <AiOutlineArrowRight />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="carousel-container">
                    <Carousel data={products} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <FooterBanner
            footerBanner={bannerData && bannerData.length >= 1 && bannerData[1]}
          />
        </div>
      )}
    </>
  );
};

export default HomePage;
