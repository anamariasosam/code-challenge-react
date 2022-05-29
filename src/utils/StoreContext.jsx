import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { productsApi, PRODUCT_API, SERVER_STATUS } from './api'

export const StoreContext = createContext()

const calculateCartTotal = (cartItems) => {
  return Object.values(cartItems).reduce((acc, { quantity }) => acc + quantity, 0)
}

const removeElementById = (list, idToDelete) => {
  return list.filter((element) => element.id !== idToDelete)
}

export const StoreProvider = ({ children }) => {
  const productsById = useRef({})
  const [cartItems, setCartItems] = useState({})
  const [favorites, setFavorites] = useState([])
  const [state, setState] = useState({
    status: 'pending',
    title: '',
    products: null,
    error: null,
  })
  const cartTotal = useMemo(() => calculateCartTotal(cartItems), [cartItems])

  const addToCart = ({ productId }) => {
    const product = productsById.current[productId]
    const quantity = (cartItems[productId]?.quantity ?? 0) + 1
    const updatedProduct = {
      ...product,
      quantity,
    }
    setCartItems((oldCartItems) => ({
      ...oldCartItems,
      [product.id]: updatedProduct,
    }))
  }

  useEffect(() => {
    console.log('get')
    productsApi.get().then(({ data, status: serverStatus }) => {
      if (serverStatus === SERVER_STATUS.OK) {
        const products = data.hits.map(
          ({ main_image, name, vendor_inventory, id, manufacturer, ...rest }) => {
            const product = {
              id,
              name,
              image: main_image,
              price: vendor_inventory[0].price,
              manufacturerName: manufacturer.name,
              manufacturerSku: manufacturer.sku,
              // ...rest,
            }
            productsById.current[id] = product
            return product
          }
        )
        setState({ status: 'resolved', products: products, title: 'Promos' })
      } else {
        setState({ status: 'rejected', error: data })
      }
    })
  }, [])

  const addToFavorites = async ({ productId }) => {
    const data = {
      favorite: true,
    }
    const { status, data: response } = await productsApi.post(PRODUCT_API.endpoints.favorites, data)

    const favProduct = productsById.current[productId]
    favProduct.favorite = true
    if (status === SERVER_STATUS.OK && response.favorite && favProduct) {
      setFavorites((oldFavorites) => [...oldFavorites, favProduct])
      return true
    }

    return false
  }

  const removeFromFavorites = async ({ productId }) => {
    const data = {
      favorite: true,
    }
    const { status, data: response } = await productsApi.post(PRODUCT_API.endpoints.favorites, data)

    if (status === SERVER_STATUS.OK && response.favorite) {
      const favProduct = productsById.current[productId]
      favProduct.favorite = false
      setFavorites(removeElementById(favorites, productId))
      return true
    }

    return false
  }

  const changeGridView = (type) => {
    const newView = Object.seal({
      title: '',
      products: null,
    })

    console.log(type)
    if (type === 'favorites') {
      newView.title = 'Favorites'
      newView.products = favorites
    } else if (type === 'cart') {
      newView.title = 'Cart Items'
      newView.products = Object.values(cartItems)
    } else {
      newView.title = 'Promos'
      newView.products = Object.values(productsById.current)
    }

    setState({ status: 'resolved', ...newView })
  }

  return (
    <StoreContext.Provider
      value={{
        status: state.status,
        gridTitle: state.title,
        gridProducts: state.products,
        cartItems,
        addToCart,
        cartTotal,
        addToFavorites,
        removeFromFavorites,
        favorites,
        changeGridView,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
