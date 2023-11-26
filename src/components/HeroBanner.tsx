/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '../../sanity/lib/image'

export interface Banner {
  smallText: string
  midText: string
  largeText1: string
  image: string
  product: number | string
  buttonText: string
  desc: string
}

type HeroBannerProps = {
  heroBanner: Banner
  backgroundImage: string
}

const HeroBanner: FC<HeroBannerProps> = ({ heroBanner, backgroundImage }) => {
  return (
    <div
      className="hero-banner-container"
      style={{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 46%',

        backgroundImage: `url(${urlForImage(backgroundImage).toString()})`,
      }}
    >
      <div>
        <p className="text-section">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        {/*   <Image
          src={urlForImage(heroBanner.image).toString()}
          alt="placeholder"
          className="hero-banner-image"
          width="300"
          height="200"
          sizes="100vw"
          style={{ top: '6rem', right: '1rem' }}
        /> */}
      </div>
    </div>
  )
}

export default HeroBanner
