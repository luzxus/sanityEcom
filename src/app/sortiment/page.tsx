// Import necessary modules
'use client'
import { Product } from '@/components'
import CTA from '@/components/CTA'
import { fetchData } from '@/pages/api'
import { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'

// Sortiment component
const Sortiment = () => {
  const [products, setProducts] = useState<any[]>()

  useEffect(() => {
    fetchData().then((res) => {
      setProducts(res.props.products)
    })
  }, [])

  return (
    <div className="all-products-container">
      <h1 style={{ textAlign: 'center', margin: '20px' }}>
        Vi har ett brett utbud av produkter
      </h1>

      <h3 style={{ textAlign: 'center', marginTop: '15px', fontWeight: 500 }}>
        Bläddra bland alla våra produkter
      </h3>
      {products ? (
        <div className="category-product-list">
          {products.map((pro) => (
            <Product product={pro} key={pro._id} />
          ))}
        </div>
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

      <CTA />
    </div>
  )
}

export default Sortiment
