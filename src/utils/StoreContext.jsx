import { createContext, useEffect, useMemo, useState } from 'react'
import { productsApi, PRODUCT_API, SERVER_STATUS } from './api'

export const StoreContext = createContext()

const calculateCartTotal = (cartItems) => {
  return Object.values(cartItems).reduce((acc, { total }) => acc + total, 0)
}

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({})
  const [products, setProducts] = useState([])
  const cartTotal = useMemo(() => Number(calculateCartTotal(cartItems)).toFixed(2), [cartItems])

  const addToCart = (product) => {
    console.log('addToCart')
    const quantity = (cartItems[product.id]?.quantity ?? 0) + 1
    const updatedProduct = {
      ...product,
      total: quantity * product.price,
      quantity,
    }
    setCartItems((oldCartItems) => ({
      ...oldCartItems,
      [product.id]: updatedProduct,
    }))
  }

  useEffect(() => {
    productsApi.get().then(({ data, status }) => {
      if (status === SERVER_STATUS.OK) {
        const products = data.hits.map(({ main_image, name, vendor_inventory, id, ...rest }) => ({
          name,
          image: main_image,
          price: vendor_inventory[0].price,
          id,
        }))

        setProducts(products)
      }
    })
  }, [])

  const addToFavorites = async (product) => {
    console.log('addToFavorites')
    const data = {
      id: '5DPzct4f2guBF5dD2LKxpS',

      favorite: true,
    }

    const { status } = await productsApi.post(PRODUCT_API.endpoints.favorites, data)

    if (status === SERVER_STATUS.OK) {
      return true
      // productsApi.get().then(({ data, status }) => {
      //   if (status === SERVER_STATUS.OK) {
      //     console.log(data.hits);
      //   }
      // });
    }

    return false
  }

  const removeFromFavorites = async (product) => {
    console.log('removeFromFavorites')
    const data = {
      id: '5DPzct4f2guBF5dD2LKxpS',

      favorite: true,
    }

    const { status } = await productsApi.post(PRODUCT_API.endpoints.favorites, data)

    if (status === SERVER_STATUS.OK) {
      return true
      // productsApi.get().then(({ data, status }) => {
      //   if (status === SERVER_STATUS.OK) {
      //     console.log(data.hits);
      //   }
      // });
    }

    return false
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        cartTotal,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
