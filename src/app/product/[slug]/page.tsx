'use client'
import React, { useEffect, useState } from 'react'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai'

import { InferGetStaticPropsType } from 'next'
import { urlForImage } from '../../../../sanity/lib/image'
import { Product } from '@/components'
import { client } from '../../../../sanity/lib/client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useStateContext } from '../../../../context/StateContext'
/* export interface Product {
  name: string
  details: string
  _id: string
  _updatedAt: string
  imageUrl: string[]
  slug: string
  image: string[]
  price: number
  _createdAt: string
  _rev: string
  _type: string
} */

type Product = any
const ProductDetails = () => {
  const [product, setProduct] = useState<Product>({} as Product)
  const [products, setProducts] = useState<any[]>()
  const slugParam = useParams()
  console.log('slug', slugParam.slug.toString())

  useEffect(() => {
    fetchData({
      params: {
        slug: slugParam.slug.toString(),
      },
    }).then((res) => {
      setProduct(res.product)
      setProducts(res.products)
    })
  }, [slugParam.slug])
  const { imageUrl, name, details, price } = product

  const [index, setIndex] = useState(0)
  const {
    decQty,
    incQty,
    qty,
    showCart,
    onAdd,
    onRemove,
    setShowCart,
  } = useStateContext()

  const handleBuyNow = () => {
    onAdd(product, qty)

    setShowCart(true)
  }

  console.log('image index', imageUrl && imageUrl[0])
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {imageUrl && imageUrl.length > 0 && (
              <Image
                src={
                  urlForImage(
                    imageUrl && imageUrl.length > 0 && imageUrl[index],
                  )?.toString() ?? ''
                }
                width={300}
                height={300}
                className="product-detail-image"
                alt="image"
              />
            )}
          </div>
          <div className="small-images-container">
            {imageUrl &&
              imageUrl.length > 0 &&
              imageUrl?.map((item: any, i: number) => (
                <Image
                  key={i}
                  alt="image"
                  width={300}
                  height={300}
                  src={urlForImage(item)?.toString() ?? ''}
                  className={
                    i === index ? 'small-image selected-image' : 'small-image'
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Produkt beskrivning: </h4>
          <p>{details}</p>
          <p className="price">{price}kr</p>
          <div className="quantity">
            <h3>Kvantitet:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={() => decQty(qty)}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={() => incQty(qty)}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Lägg i varukorg
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Köp nu
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>Du kanske också gillar</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((item: any) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const fetchData = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]{
    ...,
    "imageUrl": image[].asset->url
  }`
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {
    product,
    products,
  }
}

export default ProductDetails
