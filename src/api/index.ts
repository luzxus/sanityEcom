import { GetServerSidePropsResult, GetStaticPropsResult } from 'next'
import { client } from '../../sanity/lib/client'
import { cache } from 'react'

type HomeProps = {
  bannerData: any[]
  products: any[]
  images: any[]
}
//export const revalidate = 3600 kolla igen efter 3600sekunder
export const fetchData = async () => {
  const query = '*[_type == "product"]' //grab all products from sanity
  const products = await client.fetch(query)

  const banner = '*[_type == "banner"]' //grab all products from sanity
  const bannerData = await client.fetch(banner)

  const imagesQuery = `*[_type == "background"]{
        _id,
        "imageUrl": img.asset->url,
      }`

  const imageData = await client.fetch(imagesQuery)
  const data = {
    products: products,
    bannerData: bannerData,
    images: imageData,
  }
  console.log('DATA', data)
  return {
    props: data,
  }
}
