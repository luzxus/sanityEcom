"use client";
import { Product } from "@/components";
import CTA from "@/components/CTA";
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
      <h1 style={{ textAlign: "center", margin: "20px" }}>
        Vi har ett brett utbud av produkter
      </h1>

      <h3 style={{ textAlign: "center", marginTop: "15px", fontWeight: 500 }}>
        Bläddra bland alla våra produkter
      </h3>
      {products ? (
        <div className="category-product-list">
          {products.map((pro) => (
            <Product product={pro} key={pro._id} />
          ))}
        </div>
      ) : (
        "loading"
      )}

      <CTA />
    </div>
  );
};

export default Sortiment;
