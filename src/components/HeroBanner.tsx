/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";

//import { urlFor } from "../lib/client";
import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";

export interface Herobanner {
  smallText: string;
  midText: string;
  largeText1: string;
  image: string;
  product: number | string;
  buttonText: string;
  desc: string;
}

type HeroBannerProps = {
  heroBanner: Herobanner;
};

const HeroBanner: FC<HeroBannerProps> = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <Image
          src={heroBanner.image && urlForImage(heroBanner.image).toString()}
          alt="placeholder"
          className="hero-banner-image"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "300px", height: "auto", top: "6rem", right: "1rem" }}
        />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
