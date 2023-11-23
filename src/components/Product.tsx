import React, { FC } from "react";
import Link from "next/link";

import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";
type ProductProps = {
  product: {
    image: string;
    name: string;
    slug: {
      current: string;
    };
    price: number;
  };
};
const Product: FC<ProductProps> = ({
  product: { image, name, slug, price },
}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            src={urlForImage(image && image[0]).toString()}
            width={250}
            height={250}
            className="product-image"
            alt="product image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
