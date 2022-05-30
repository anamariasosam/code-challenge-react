export const RESPONSE = Object.freeze({
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
})

export const FILTER = Object.freeze({
  FAVORITES: 'favourites',
  CART_ITEMS: 'cart',
  DEFAULT: 'promos',
})

export const PRODUCTS_ACTION = Object.freeze({
  MODIFY_CART: 'MODIFY_CART',
  CHANGE_FAVORITE: 'CHANGE_FAVORITE',
  INITAL_STATE: 'INITAL_STATE',
  API_RESPONSE: 'apiResponse',
})

export const SERVER_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
}

export const PRODUCT_API = Object.freeze({
  url: 'https://demo5514996.mockable.io',
  endpoints: {
    default: 'products',
    products: 'products',
    favorites: 'favorites',
  },
})
