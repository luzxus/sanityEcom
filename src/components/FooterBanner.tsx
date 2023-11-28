import Link from "next/link";
import { FC } from "react";

import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";

type FooterBannerProps = {
  footerBanner: {
    smallText: string;
    midText: string;
    largeText1: string;
    image: string;
    product: number | string;
    buttonText: string;
    desc: string;
    discount: number;
    largeText2: string;
    saleTime: number;
  };
};

const FooterBanner: FC<FooterBannerProps> = ({ footerBanner }) => {
  const {
    desc,
    discount,
    image,
    largeText1,
    largeText2,
    midText,
    product,
    saleTime,
    smallText,
  } = footerBanner;

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <h3>{smallText ?? "Mängder av bra deals"}</h3>
          <h4>{midText}</h4>
          <h1>{largeText1}</h1>
        </div>

        <div className="right">
          <h1>{discount}</h1>
          <h2>{saleTime}</h2>
          <Link className="cta" href={`/sortiment`}>
            <button>Utforska</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
