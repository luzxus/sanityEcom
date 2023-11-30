'use client'
import { parseImage } from '@/utils'
import { Product } from '@/components'
import CTA from '@/components/CTA'
import CategoryBanner from '@/components/CategoryBanner'
import {
  fetchData,
  fetchProductsByCategory,
  fetchProductsByTags,
  fetchTags,
} from '@/pages/api'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Oval } from 'react-loader-spinner'

const CategoryPage = () => {
  const [categoryProducts, setCategoryProducts] = useState<any[]>()
  const slugParam = useParams<{ slug: string }>()
  const [isLoadingData, setIsLoadingData] = useState(false)

  const [categoryBanner, setCategoryBanner] = useState<any>({})

  const [tagProducts, setTagProducts] = useState<any[]>()

  function shuffleArray(array: any[]) {
    const shuffled = array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
    console.log('after shuffle', shuffled)
    return shuffled
  }

  const [tags, setTags] = useState<any[]>()

  const [alternativeProducts, setAlternativeProducts] = useState<any[]>()

  let randomTag = useMemo(() => {
    return tags ? shuffleArray(tags)[0] : 'chili'
  }, [tags])

  useEffect(() => {
    fetchTags().then((res) => setTags(res.tags))
  }, [])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      try {
        setIsLoadingData(true)
        if (slugParam?.slug) {
          fetchProductsByCategory(slugParam.slug).then((res) => {
            if (res.products.length > 0) {
              setCategoryProducts(res.products)
            } else {
              fetchData().then((res) =>
                setAlternativeProducts(res.props.products),
              )
            }
            setCategoryBanner(res.bannerData || {}) // Handle undefined case
          })
        }
        if (randomTag.slug) {
          fetchProductsByTags(randomTag.slug).then((res) =>
            setTagProducts(res.tagProducts || []),
          )
        }
        setIsLoadingData(false)
      } catch (err) {
        setIsLoadingData(false)
      }
    }
    return () => {
      isMounted = false
    }
  }, [randomTag, slugParam, tags])

  console.log('category proucts', categoryProducts)

  return (
    <div className="category-container">
      {categoryProducts && (
        <CategoryBanner
          bannerImage={categoryProducts[0].bannerImage}
          categoryBanner={categoryBanner && categoryBanner}
        />
      )}
      {categoryProducts && (
        <h1 style={{ textAlign: 'center', marginTop: '5rem' }}>
          Utforska våra produkter
        </h1>
      )}
      <div className="category-product-list">
        {!isLoadingData ? (
          categoryProducts ? (
            categoryProducts.map((pro) => (
              <Product product={pro} key={pro._id} />
            ))
          ) : (
            <div className="alternative-product-container">
              <div className="alternative-product-text-container">
                <h2>
                  {`Inga produkter finns tillgängliga för den valda kategorin`}
                </h2>
                <h2>Utforska gärna våra andra produkter</h2>
                <div className="info-icon">
                  <AiOutlineInfoCircle />
                </div>
              </div>
              <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                Våra andra produkter
              </h1>
              <div className="category-product-list alternative-product-list">
                {alternativeProducts?.map((altPro) => (
                  <Product product={altPro} key={altPro._id} />
                ))}
              </div>
            </div>
          )
        ) : (
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
        )}
      </div>

      <div className="CTA">
        <CTA />
      </div>

      {tagProducts && tagProducts?.length > 0 && (
        <div className="tags-products-list">
          {/* produkter med gemensamma tags */}
          <h1 style={{ textAlign: 'center', marginTop: '5rem' }}>
            {categoryProducts ? 'Andra har även köpt' : 'Vi rekommenderar'}
          </h1>
          <div className="category-product-list">
            {tagProducts?.map((pro) => (
              <Product product={pro} key={pro._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryPage
