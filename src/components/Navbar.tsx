'use client'

import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import { useStateContext } from '../../context/StateContext'
import { Cart } from '.'

const Navbar = () => {
  const { totalQuantities, setShowCart, showCart } = useStateContext()
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Warning Chilizone</Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(!showCart)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
