"use client";

import { Product } from "@/components";
import { fetchProductsByCategory } from "@/pages/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoryPage = () => {
  const [categoryProducts, setCategoryProducts] = useState<any[]>();
  const slugParam = useParams();

  useEffect(() => {
    fetchProductsByCategory(slugParam!.slug as string).then((res) =>
      setCategoryProducts(res.data)
    );
  }, [slugParam]);

  console.log("category products", categoryProducts);
  return (
    <div className="category-product-list">
      {categoryProducts
        ? categoryProducts.length < 1
          ? "Inga produkter tillgängliga"
          : categoryProducts.map((pro) => (
              <Product product={pro} key={pro._id} />
            ))
        : "loading"}
    </div>
  );
};

export default CategoryPage;
