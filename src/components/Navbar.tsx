'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import { useStateContext } from '../../context/StateContext'
import { Cart } from '.'
import { fetchCategories } from '@/pages/api'

type Category = {
  _id?: string
  name: string
  slug: {
    current: string
  }
}

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.props.categories))
  }, [])

  const { totalQuantities, setShowCart, showCart } = useStateContext()

  const pages = [
    { text: 'Om oss', slug: 'about' },
    { text: 'Kontakt', slug: 'contact' },
    { text: 'Fraktinformation', slug: 'shippingInfo' },
  ]
  return (
    <div className="navbar-container">
      <div className="pages-list">
        <p className="logo">
          <Link href="/">Warning Chilizone</Link>
        </p>
        {pages.map((page) => (
          <Link
            style={{ color: 'rgb(134 104 115)' }}
            key={page.slug}
            href={`/${page.slug}`}
          >
            {page.text}
          </Link>
        ))}

        <div className="navbar-cart">
          <button
            type="button"
            className="cart-icon"
            onClick={() => setShowCart(!showCart)}
          >
            <AiOutlineShopping />
            <span className="cart-item-qty top-0">{totalQuantities}</span>
          </button>

          {showCart && <Cart />}
        </div>
      </div>

      <div className="categories-list">
        {categories.map((category) => (
          <Link key={category._id} href={`/category/${category.slug.current}`}>
            <p className="products-heading">{category.name.toUpperCase()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Navbar
