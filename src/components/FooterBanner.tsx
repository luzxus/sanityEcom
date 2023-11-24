import Link from 'next/link'
import { FC } from 'react'

import Image from 'next/image'
import { urlForImage } from '../../sanity/lib/image'

type FooterBannerProps = {
  footerBanner: {
    smallText: string
    midText: string
    largeText1: string
    image: string
    product: number | string
    buttonText: string
    desc: string
    discount: number
    largeText2: string
    saleTime: number
  }
}

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
  } = footerBanner

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <Image
          src={image && urlForImage(image).toString()}
          width={300}
          height={250}
          style={{ top: '6rem', right: '10rem' }}
          alt=""
        />
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc ?? ''}</p>
          <Link href={`/product/${product}`}></Link>
        </div>
      </div>
    </div>
  )
}

export default FooterBanner
