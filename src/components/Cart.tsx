'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'
import getStripe from '../../sanity/lib/getStripe'
import { urlForImage } from '../../sanity/lib/image'
import Image from 'next/image'
import { useStateContext } from '../../context/StateContext'

const Cart = () => {
  const cartRef = useRef(null)
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext()

  const handleCheckout = async () => {
    const stripe = await getStripe()


    const cartData: any[] = cartItems
      ? cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        }))
      : []

    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            'sk_test_51ODBTSCDDTyH4CHBMTfdnELQKIzD5gmiA4K1laqHaysYD3PEvbzWLAl12xfHBx1RhhnVDwCobtile9FaQ7MJI0Ib00UFoAAv9K',
        },
        body: JSON.stringify(cartItems),
      })

      if (response.status === 500) return

      const data = await response.json()

      toast.loading('Redirecting...')

      stripe!.redirectToCheckout({ sessionId: data.id })
    } catch (err) {
      console.log('error while trying to post', err)
    }
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Din varukorg</span>
          <span className="cart-num-items">({totalQuantities} föremål)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Din varukorg är tom</h3>

            <button
              type="button"
              onClick={() => setShowCart(false)}
              className="btn"
            >
              Fortsätt handla
            </button>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item: any) => (
              <div className="product" key={item._id}>
                <Image
                  width={300}
                  height={300}
                  alt=""
                  src={urlForImage(item?.image[0]).toString()}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>{item.price}kr</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, 'dec')
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num" onClick={() => {}}>
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, 'inc')
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Summa:</h3>
              <h3>{totalPrice}kr</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Till kassan{' '}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
