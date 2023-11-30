// Import necessary modules
'use client'
import { useStateContext } from 'context/StateContext'
import Link from 'next/link'
import { useEffect } from 'react'
import { BsBagCheckFill } from 'react-icons/bs'

// Import Metadata type from Next.js

// Success component
const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()

  // Clear local storage and reset cart data on component mount
  useEffect(() => {
    localStorage.clear()
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
  }, [setCartItems, setTotalPrice, setTotalQuantities])

  return (
    <main className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Tack för din beställning!</h2>
        <p className="email-msg">Kolla din email för orderbekräftelse</p>
        <p className="description">
          Har du några frågor? Skicka ett mail till{' '}
          <a
            className="email"
            href="mailto:order@example.com?subject=Orderfråga"
          >
            exempel@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" style={{ width: '300px' }} className="btn">
            Fortsätt shoppa
          </button>
        </Link>
      </div>
    </main>
  )
}

export default Success
