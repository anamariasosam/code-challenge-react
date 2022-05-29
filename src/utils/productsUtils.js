import { productsApi, PRODUCT_API, SERVER_STATUS } from './api'
import { FILTER, PRODUCTS_ACTION, RESPONSE } from './constants'

export const calculateCartTotal = (list) => {
  return list.reduce((acc, { quantity }) => acc + quantity, 0)
}

export const toggleProductFavoriteStatus = (oldProducts, { productId, favorite = true }) => {
  return oldProducts.map((product) => {
    if (product.id === productId) {
      return {
        ...product,
        favorite,
      }
    }

    return product
  })
}

export const changeProductQuantity = (oldProducts, { productId, increase = true }) => {
  return oldProducts.map((product) => {
    if (product.id === productId) {
      const quantity = (product.quantity ?? 0) + (increase ? 1 : -1)
      return {
        ...product,
        quantity,
      }
    }

    return product
  })
}

export const transformProductsFromApi = (data) => {
  return data.hits.map(({ main_image, name, vendor_inventory, id, manufacturer, ...rest }) => {
    return {
      id,
      name,
      image: main_image,
      price: vendor_inventory[0].price,
      manufacturerName: manufacturer.name,
      manufacturerSku: manufacturer.sku,
      quantity: 0,
      favorite: false,
      // ...rest,
    }
  })
}

const filterProducts = (product, filter) => {
  if (filter === FILTER.FAVORITES) {
    return product.favorite === true
  } else if (filter === FILTER.CART_ITEMS) {
    return product.quantity > 0
  }

  return true
}

export const getGridProducts = (products, filter) => {
  return products.filter((product) => filterProducts(product, filter))
}

export const addToFavorites = async (dispatch, productId) => {
  const { status, data: response } = await productsApi.post(PRODUCT_API.endpoints.favorites, {
    favorite: true,
  })
  if (status === SERVER_STATUS.OK && response.favorite) {
    dispatch({ type: PRODUCTS_ACTION.CHANGE_FAVORITE, payload: { productId, favorite: true } })
  } else {
    dispatch({ type: PRODUCTS_ACTION.INITAL_STATE })
  }
}

export const removeFromFavorites = async (dispatch, productId) => {
  const { status, data: response } = await productsApi.delete(PRODUCT_API.endpoints.favorites, {
    favorite: false,
  })

  if (status === SERVER_STATUS.OK && response.favorite === false) {
    dispatch({ type: PRODUCTS_ACTION.CHANGE_FAVORITE, payload: { productId, favorite: false } })
  } else {
    dispatch({ type: PRODUCTS_ACTION.INITAL_STATE })
  }
}

export const fetchProducts = async (dispatch) => {
  dispatch({ type: PRODUCTS_ACTION.API_RESPONSE, payload: { status: RESPONSE.PENDING } })
  try {
    const { data, status: serverStatus } = await productsApi.get()
    if (serverStatus === SERVER_STATUS.OK) {
      const products = transformProductsFromApi(data)
      dispatch({
        type: PRODUCTS_ACTION.API_RESPONSE,
        payload: { status: RESPONSE.RESOLVED, products },
      })
    } else {
      dispatch({ type: PRODUCTS_ACTION.API_RESPONSE, payload: { status: RESPONSE.REJECTED, data } })
    }
  } catch (error) {
    dispatch({ type: PRODUCTS_ACTION.API_RESPONSE, payload: { status: RESPONSE.REJECTED, error } })
  }
}
