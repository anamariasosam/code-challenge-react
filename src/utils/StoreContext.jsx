import { createContext, useEffect, useMemo, useState } from 'react'
import { productsApi, PRODUCT_API, SERVER_STATUS } from './api'
import { FILTER, RESPONSE } from './constants'
import {
  calculateCartTotal,
  changeProductQuantity,
  getGridProducts,
  toggleProductFavoriteStatus,
  transformProductsFromApi,
} from './productsUtils'

export const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  const [status, setStatus] = useState(RESPONSE.PENDING)
  const [products, setProducts] = useState([])
  const cartTotal = useMemo(() => calculateCartTotal(products), [products])
  const [filter, setFilter] = useState(FILTER.DEFAULT)
  const [sectionTitle, setSectionTitle] = useState(FILTER.DEFAULT)
  const gridProducts = useMemo(() => getGridProducts(products, filter), [products, filter])

  const addToCart = ({ productId }) => {
    setProducts((oldProducts) => changeProductQuantity(oldProducts, productId))
  }

  const removeFromCart = ({ productId }) => {
    setProducts((oldProducts) => changeProductQuantity(oldProducts, productId, -1))
  }

  const addToFavorites = async ({ productId }) => {
    const { status, data: response } = await productsApi.post(PRODUCT_API.endpoints.favorites, {
      favorite: true,
    })
    if (status === SERVER_STATUS.OK && response.favorite) {
      setProducts((oldProducts) => toggleProductFavoriteStatus(oldProducts, productId))
      return true
    }
    return false
  }

  const removeFromFavorites = async ({ productId }) => {
    const { status, data: response } = await productsApi.delete(PRODUCT_API.endpoints.favorites, {
      favorite: false,
    })
    if (status === SERVER_STATUS.OK && response.favorite === false) {
      setProducts((oldProducts) => toggleProductFavoriteStatus(oldProducts, productId, false))
      return true
    }
    return false
  }

  const handleProductsFromApi = async () => {
    const { data, status: serverStatus } = await productsApi.get()
    if (serverStatus === SERVER_STATUS.OK) {
      setProducts(() => transformProductsFromApi(data))
      setStatus(RESPONSE.RESOLVED)
    } else {
      setStatus(RESPONSE.REJECTED)
    }
  }

  const changeGridView = (type) => {
    setSectionTitle(type)
    setFilter(type)
  }

  useEffect(() => {
    console.log('get')
    handleProductsFromApi()
  }, [])

  return (
    <StoreContext.Provider
      value={{
        sectionTitle,
        status,
        cartTotal,
        gridProducts,
        addToCart,
        removeFromCart,
        addToFavorites,
        removeFromFavorites,
        changeGridView,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
