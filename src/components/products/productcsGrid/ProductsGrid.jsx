import { useContext, useMemo } from 'react'
import { FILTER, RESPONSE } from 'utils/constants'
import { StoreContext } from 'provider/StoreContext'
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

const getProductCardOptions = ({
  sectionTitle,
  addToCart,
  addToFavorites,
  removeFromFavorites,
  removeFromCart,
}) => {
  const defaultOptions = [
    {
      onClick: addToFavorites,
      toggleFn: removeFromFavorites,
      icon: 'favorite',
    },
  ]

  if (sectionTitle === FILTER.CART_ITEMS) {
    return [
      ...defaultOptions,
      {
        onClick: removeFromCart,
        title: 'Remove From Cart',
        type: 'primary',
      },
    ]
  }

  return [
    ...defaultOptions,
    {
      onClick: addToCart,
      title: 'Add To Cart',
      type: 'primary',
    },
  ]
}

const ProductsGrid = () => {
  const {
    sectionTitle,
    status,
    gridProducts: products,
    addToCart,
    addToFavorites,
    removeFromFavorites,
    removeFromCart,
  } = useContext(StoreContext)
  const options = useMemo(
    () =>
      getProductCardOptions({
        sectionTitle,
        addToCart,
        addToFavorites,
        removeFromFavorites,
        removeFromCart,
      }),
    [addToCart, addToFavorites, removeFromCart, removeFromFavorites, sectionTitle]
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
