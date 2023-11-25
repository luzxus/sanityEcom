'use client'
import React, {
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { toast } from 'react-hot-toast'

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

type Product = {
  _id: any
  name: string
  price: number
  quantity: number
  // Add any other properties based on your actual product structure
}

type ContextProps = {
  showCart: boolean
  cartItems: Product[]
  totalPrice: number
  totalQuantities: number
  qty: number
  incQty: Dispatch<SetStateAction<number>>
  decQty: Dispatch<SetStateAction<number>>
  onAdd: (product: Product, quantity: number) => void
  onRemove: (product: Product) => void
  toggleCartItemQuantity: (id: any, value: any) => void
  setShowCart: Dispatch<SetStateAction<boolean>>
}

const Context = createContext<ContextProps>({} as ContextProps)

export const StateContext = ({ children }: Props) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalQuantities, setTotalQuantities] = useState<number>(0)
  const [qty, setQty] = useState<number>(1)

  let foundProduct: Product | undefined
  let index: number

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id,
    )

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          }
        }
        return cartProduct // Return the unchanged item for other products
      })

      setCartItems(updatedCartItems.filter(Boolean)) // Filter out undefined values
    } else {
      product.quantity = quantity
      setCartItems([...cartItems, { ...product }])
    }

    toast.success(`${qty} ${product.name} tillagda i varukorgen.`)
  }

  const onRemove = (product: Product) => {
    foundProduct = cartItems.find((item) => item._id === product._id)
    const newCartItems = cartItems.filter((item) => item._id !== product._id)
    if (foundProduct) {
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct!.price * foundProduct!.quantity,
      )
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities - foundProduct!.quantity,
      )
      setCartItems(newCartItems)
    }
  }

  const toggleCartItemQuantity = (id: any, value: any) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id)
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if (foundProduct) {
      if (value === 'inc') {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ])
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct!.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
      } else if (value === 'dec') {
        if (foundProduct.quantity > 1) {
          setCartItems([
            ...newCartItems,
            { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ])
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice - foundProduct!.price,
          )
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
        }
      }
    }
  }
  console.log('show cart', showCart)
  const incQty = () => {
    setQty((prev) => prev + 1)
  }

  const decQty = () => {
    setQty((prev: number) => {
      if (prev - 1 < 1) return 1
      return prev - 1
    })
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
        setShowCart,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
