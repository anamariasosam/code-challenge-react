import { useContext } from 'react'
import { StoreContext } from '../../utils/StoreContext'
import ProductCard from './ProductCard'

const product = {
  id: '1',
  image: './image.png',
  price: '24.18',
  name: 'This is some double line text of the product title for the card...',
}

const ProductsList = () => {
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

  return (
    <div className="products">
      {productsList.length > 0
        ? productsList.map((_) => {
            return (
              <ProductCard key={product.id} product={product}>
                <ProductCard.Options>{options}</ProductCard.Options>
              </ProductCard>
            )
          })
        : 'No Products'}
    </div>
  )
}

export default ProductsList
