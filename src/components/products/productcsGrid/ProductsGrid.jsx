import { useContext } from 'react'
import { StoreContext } from '../../../utils/StoreContext'
import ProductCard from '../productCard/ProductCard'
import './_ProductsGrid.scss'

const ProductsGrid = () => {
  const {
    products: productsList,
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
    <div className="productsGrid--empty">
      <i className="fu fu__sowingo-icon productsGrid__placeholder" />
      <h2 className="productsGrid__message">No products found</h2>
    </div>
  )
}

export default ProductsGrid
