import React, { FC } from "react";
import Link from "next/link";

import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";

/* type FooterBannerProps = {
  footerBanner: {
    discount: number; // Assuming discount is a numeric value, adjust as needed
    largeText1: string;
    largeText2: string;
    saleTime: string; // You might want to use a specific type for representing time
    smallText: string;
    midText: string;
    desc: string;
    product: number | string;
    buttonText: string;
    image: string;
  };
}; */
type FooterBannerProps = {
  img: string;
};
const FooterBanner: FC<{ footerBanner: any }> = ({ footerBanner }) => {
  console.log("props", footerBanner);
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          {/*  <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p> */}
        </div>
        <div className="right">
          {/*    <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p> 
          <Link href={`/product/${product}`}></Link>*/}
        </div>

        <Image
          src={footerBanner.imageUrl || ""}
          className="footer-banner-image"
          width={300}
          height={300}
          alt=""
        />
      </div>
    </div>
  );
};

export default FooterBanner;
