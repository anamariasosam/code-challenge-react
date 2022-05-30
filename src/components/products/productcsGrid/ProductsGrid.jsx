import { useMemo } from 'react'
import { FILTER, PRODUCTS_ACTION, RESPONSE } from 'utils/constants'
import { useStore, addToFavorites, removeFromFavorites } from 'provider/StoreContext'
import ProductCard from '../productCard/ProductCard'
import './_ProductsGrid.scss'

const ProductsGridEmpty = ({ message }) => {
  return (
    <div className="productsGrid--empty">
      <i className="fu fu__sowingo-icon productsGrid__placeholder" />
      <h2 className="productsGrid__message">{message}</h2>
    </div>
  )
}

const getProductCardOptions = (sectionTitle, dispatch) => {
  const addToFav = ({ productId }) => {
    addToFavorites(dispatch, productId)
  }

  const removeFromFav = ({ productId }) => {
    removeFromFavorites(dispatch, productId)
  }

  const addToCart = ({ productId }) => {
    dispatch({ type: PRODUCTS_ACTION.MODIFY_CART, payload: { productId, increase: true } })
  }

  const removeFromCart = ({ productId }) => {
    dispatch({ type: PRODUCTS_ACTION.MODIFY_CART, payload: { productId, increase: false } })
  }

  const defaultOptions = [
    {
      onClick: addToFav,
      toggleFn: removeFromFav,
      icon: 'favorite',
      name: 'toggle favorite',
    },
  ]

  if (sectionTitle === FILTER.CART_ITEMS) {
    return [
      ...defaultOptions,
      {
        onClick: removeFromCart,
        title: 'Remove From Cart',
        type: 'primary',
        name: 'remove from cart',
      },
    ]
  }

  return [
    ...defaultOptions,
    {
      onClick: addToCart,
      title: 'Add To Cart',
      type: 'primary',
      name: 'add to cart',
    },
  ]
}

const ProductsGrid = () => {
  const {
    state: { sectionTitle, status, gridProducts: products },
    dispatch,
  } = useStore()

  const options = useMemo(
    () => getProductCardOptions(sectionTitle, dispatch),
    [dispatch, sectionTitle]
  )

  if (status === RESPONSE.RESOLVED) {
    return products.length > 0 ? (
      <div className="productsGrid">
        {products.map((product) => {
          return (
            <ProductCard key={product.id} product={product}>
              <ProductCard.Options>{options}</ProductCard.Options>
            </ProductCard>
          )
        })}
      </div>
    ) : (
      <ProductsGridEmpty message="No products found." />
    )
  } else if (status === RESPONSE.REJECTED) {
    return <ProductsGridEmpty message="Something happened trying to get the products." />
  }

  return null
}

export default ProductsGrid
