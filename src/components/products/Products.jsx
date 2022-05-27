import { Children, cloneElement, useContext } from 'react'
import { StoreContext } from '../../utils/StoreContext'
import Button from '../common/button/Button'
import './Products.scss'

const ProductOptions = ({ children = [], productId }) => {
  return (
    <div className="product__buttons">
      {children.map(({ icon, title, extraClass, click, toggle, toggleFn }) => {
        return (
          <Button
            key={click.name}
            onClickFn={() => click(productId)}
            icon={icon}
            toggle={toggle}
            toggleFn={toggleFn ? () => toggleFn(productId) : null}
            extraClass={extraClass}
          >
            {title}
          </Button>
        )
      })}
    </div>
  )
}

const ProductCard = ({ product: { image, price, name, id }, children }) => {
  const imgSrc = image ?? './image.png'
  return (
    <figure className="product col-md-3">
      <img src={`${imgSrc}`} alt={name} className="product__image" />
      <figcaption className="product__description">
        <p className="product__title">{name}</p>
        <div className="product-price">
          <p className="product-price__text">Your Price</p>
          <p className="product-price__value">${price}</p>
        </div>
        {Children.map(children, (child) =>
          cloneElement(child, {
            productId: id,
          })
        )}
      </figcaption>
    </figure>
  )
}

ProductCard.Options = ProductOptions

const Products = () => {
  const {
    products: productsList,
    addToCart,
    addToFavorites,
    removeFromFavorites,
  } = useContext(StoreContext)

  const options = [
    {
      click: addToFavorites,
      toggleFn: removeFromFavorites,
      icon: 'favorite',
    },
    {
      click: addToCart,
      title: 'Add To Cart',
      extraClass: 'primary',
    },
  ]

  return (
    <div className="products">
      {productsList.length > 0
        ? productsList.map((product, index) => {
            /* const product = {
              id: index,
              image: './image.png',
              price: '24.18',
              name: 'This is some double line text of the product title for the card...',
            } */

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

export default Products
