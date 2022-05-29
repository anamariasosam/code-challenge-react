import { useContext } from 'react'
import { StoreContext } from '../../../utils/StoreContext'
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
const ProductsGrid = () => {
  const {
    status,
    gridProducts: productsList,
    addToCart,
    addToFavorites,
    removeFromFavorites,
  } = useContext(StoreContext)

  const options = [
    {
      onClick: addToFavorites,
      toggleFn: removeFromFavorites,
      icon: 'favorite',
    },
    {
      onClick: addToCart,
      title: 'Add To Cart',
      type: 'primary',
    },
  ]

  if (status === 'resolved') {
    return productsList.length > 0 ? (
      <div className="productsGrid">
        {productsList.map((product) => {
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
  } else if (status === 'rejected') {
    return <ProductsGridEmpty message="Something happened trying to get the products." />
  }

  return null
}

export default ProductsGrid
