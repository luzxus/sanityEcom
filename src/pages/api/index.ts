import { GetServerSidePropsResult, GetStaticPropsResult } from 'next'
import { client } from '../../../sanity/lib/client'
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
  return {
    props: data,
  }
}

export const fetchCategories = async () => {
  const categoryQuery = '*[_type == "category"]' //grab all products from sanity
  const categories = await client.fetch(categoryQuery)

  const tagsQuery = '*[_type == "tags"]' //grab all products from sanity
  const tags = await client.fetch(tagsQuery)

  const data = {
    categories,
    tags,
  }
  console.log('DATA', data)
  return {
    props: data,
  }
}
