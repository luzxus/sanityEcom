/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";

export interface Banner {
  midText: string;
  largeText1: string;
  image: string;
  buttonText: string;
  category: string;
  discount: string;
  saleTime: string;
  bannerImageUrl: string;
}

type CategoryBannerProps = {
  categoryBanner: Banner;
};

const CategoryBanner: FC<CategoryBannerProps> = ({ categoryBanner }) => {
  return (
    <div className="category-banner-container">
      {!categoryBanner ? (
        "loading"
      ) : (
        <>
          {categoryBanner?.bannerImageUrl && (
            <Image
              alt=""
              src={urlForImage(categoryBanner.bannerImageUrl).toString()}
              width="0"
              height="0"
              sizes="100vw"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          )}

          <div className="large-text-container">
            <h2>{categoryBanner.largeText1}</h2>
            <h3>{categoryBanner.discount}</h3>
            <h4>{categoryBanner.midText}</h4>
          </div>
          <p>*{categoryBanner.saleTime}</p>
        </>
      )}
    </div>
  );
};

export default CategoryBanner;
