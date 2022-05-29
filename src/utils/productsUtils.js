import { FILTER } from './constants'

export const calculateCartTotal = (list) => {
  return list.reduce((acc, { quantity }) => acc + quantity, 0)
}

export const toggleProductFavoriteStatus = (oldProducts, productId, favorite = true) => {
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

export const changeProductQuantity = (oldProducts, productId, delta = 1) => {
  return oldProducts.map((product) => {
    if (product.id === productId) {
      const quantity = (product.quantity ?? 0) + delta
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
