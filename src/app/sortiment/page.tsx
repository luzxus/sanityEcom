"use client";
import { Product } from "@/components";
import { fetchData } from "@/pages/api";
import React, { useEffect, useState } from "react";

const Sortiment = () => {
  const [products, setProducts] = useState<any[]>();
  useEffect(() => {
    fetchData().then((res) => {
      setProducts(res.props.products);
    });
  }, []);

  return (
    <div className="all-products-container">
      {products ? (
        <div className="category-product-list">
          {products.map((pro) => (
            <Product product={pro} key={pro._id} />
          ))}
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default Sortiment;
