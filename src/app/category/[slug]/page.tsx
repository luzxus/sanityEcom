"use client";
import { Product } from "@/components";
import CTA from "@/components/CTA";
import CategoryBanner from "@/components/CategoryBanner";
import {
  fetchData,
  fetchProductsByCategory,
  fetchProductsByTags,
  fetchTags,
} from "@/pages/api";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const CategoryPage = () => {
  const [categoryProducts, setCategoryProducts] = useState<any[]>();
  const slugParam = useParams<{ slug: string }>();
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [categoryBanner, setCategoryBanner] = useState<any>({});

  const [tagProducts, setTagProducts] = useState<any[]>();

  function shuffleArray(array: any[]) {
    console.log("before shuffle", array);
    const shuffled = array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    console.log("after shuffle", shuffled);
    return shuffled;
  }

  const [tags, setTags] = useState<any[]>();

  const [alternativeProducts, setAlternativeProducts] = useState<any[]>();

  let randomTag = useMemo(() => {
    return tags ? shuffleArray(tags)[0] : "chili";
  }, [tags]);

  useEffect(() => {
    fetchTags().then((res) => setTags(res.tags));
  }, []);

  console.log("TAG", randomTag);
  console.log("product category array", categoryProducts);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      try {
        setIsLoadingData(true);
        if (slugParam?.slug) {
          fetchProductsByCategory(slugParam.slug!).then((res) => {
            console.log("slug param slug", slugParam.slug);
            if (res.products.length > 0) {
              setCategoryProducts(res.products);
            } else {
              fetchData().then((res) =>
                setAlternativeProducts(res.props.products)
              );
            }
            setCategoryBanner(res.bannerData || {}); // Handle undefined case
          });
        }
        if (randomTag) {
          console.log("fetching by tag", randomTag);
          fetchProductsByTags(randomTag.slug).then((res) =>
            setTagProducts(res.tagProducts || [])
          );
        }
        setIsLoadingData(false);
      } catch (err) {
        setIsLoadingData(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [randomTag, slugParam, tags]);

  console.log("tag products", tagProducts);
  return (
    <div className="category-container">
      {categoryBanner && <CategoryBanner categoryBanner={categoryBanner} />}
      {categoryProducts && (
        <h1 style={{ textAlign: "center", marginTop: "5rem" }}>
          Utforska våra produkter
        </h1>
      )}
      <div className="category-product-list">
        {!isLoadingData ? (
          categoryProducts ? (
            categoryProducts.map((pro) => (
              <Product product={pro} key={pro._id} />
            ))
          ) : (
            <div className="alternative-product-container">
              <div className="alternative-product-text-container">
                <h2>
                  {`Inga produkter finns tillgängliga för den valda kategorin`}
                </h2>
                <h2>Utforska gärna våra andra produkter</h2>
                <div className="info-icon">
                  <AiOutlineInfoCircle />
                </div>
              </div>
              <h1 style={{ textAlign: "center", marginTop: "20px" }}>
                Våra andra produkter
              </h1>
              <div className="category-product-list alternative-product-list">
                {alternativeProducts?.map((altPro) => (
                  <Product product={altPro} key={altPro._id} />
                ))}
              </div>
            </div>
          )
        ) : (
          "loading"
        )}
      </div>

      <div className="CTA">
        <CTA />
      </div>

      {tagProducts && tagProducts?.length > 0 && (
        <div className="tags-products-list">
          {/* produkter med gemensamma tags */}
          <h1 style={{ textAlign: "center", marginTop: "5rem" }}>
            {categoryProducts ? "Andra har även köpt" : "Vi rekommenderar"}
          </h1>
          <div className="category-product-list">
            {tagProducts?.map((pro) => (
              <Product product={pro} key={pro._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
