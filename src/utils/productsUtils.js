import { productsApi } from './api'
import { FILTER, PRODUCTS_ACTION, PRODUCT_API, RESPONSE, SERVER_STATUS } from './constants'
import { toLowerCase } from './searchUtils'

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
  return data.hits.map(({ main_image, name, vendor_inventory, id, manufacturer, unit_name }) => {
    const price = vendor_inventory[0].price ?? 0
    const { name: manufacturerName, sku: manufacturerSku } = manufacturer
    return {
      id,
      name,
      image: main_image,
      price,
      quantity: 0,
      favorite: false,
      searchKeywords: toLowerCase([name, price, manufacturerName, manufacturerSku, unit_name]),
    }
  })
}

const filterByType = (product, filter) => {
  if (filter === FILTER.FAVORITES) {
    return product.favorite === true
  } else if (filter === FILTER.CART_ITEMS) {
    return product.quantity > 0
  }

  return true
}

const searchProducts = (product, search) =>
  product.searchKeywords.join(' ').includes(search.toLowerCase())

const filterAndSearch = (product, search, filter) =>
  filterByType(product, filter) && searchProducts(product, search)

export const getGridProducts = (products, filter, search) => {
  const searchNoEmpty = search.length > 0
  if (searchNoEmpty) {
    if (filter === FILTER.DEFAULT) {
      // Only Search
      return products.filter((product) => searchProducts(product, search))
    } else {
      // Filter And Search
      return products.filter((product) => filterAndSearch(product, search, filter))
    }
  } else if (filter !== FILTER.DEFAULT) {
    // Only Filter
    return products.filter((product) => filterByType(product, filter))
  }

  // No Search and No Filter
  return products
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
    console.error(error)
    dispatch({ type: PRODUCTS_ACTION.API_RESPONSE, payload: { status: RESPONSE.REJECTED, error } })
  }
}
