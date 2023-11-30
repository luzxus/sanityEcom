/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '../../sanity/lib/image'
import { Oval } from 'react-loader-spinner'

export interface Banner {
  midText: string
  largeText1: string
  image: string
  buttonText: string
  category: string
  discount: string
  saleTime: string
  bannerImageUrl: string
}

type CategoryBannerProps = {
  categoryBanner?: Banner
  bannerImage: string
}

const CategoryBanner: FC<CategoryBannerProps> = ({
  categoryBanner,
  bannerImage,
}) => {
  return (
    <div className="category-banner-container">
      {!bannerImage ? (
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass="spinner-loader"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        <>
          {bannerImage && (
            <Image
              alt=""
              src={urlForImage(bannerImage).toString()}
              width="0"
              height="0"
              sizes="100vw"
              style={{ width: '40%', height: 'auto', objectFit: 'cover' }}
            />
          )}

          <div className="large-text-container">
            <h2>{categoryBanner?.largeText1}</h2>
            <h3>{categoryBanner?.discount}</h3>
            <h4>{categoryBanner?.midText}</h4>
          </div>
          <p>{categoryBanner?.saleTime}</p>
        </>
      )}
    </div>
  )
}

export default CategoryBanner
