import { Children, cloneElement, memo } from 'react'
import { ButtonList } from 'components/common/button/Button'
import './_ProductCard.scss'

const placeholderImgSrc = './images/product-placeholder.png'

const ProductCard = memo(({ product: { image, price, name, id, favorite }, children }) => {
  const imgSrc = image ?? placeholderImgSrc
  return (
    <figure className="productCard">
      <img src={`${imgSrc}`} alt={name} className="productCard__image" />
      <figcaption className="productCard__info">
        <p className="productCard__title">{name}</p>
        <div className="productCard__box">
          <p className="productCard__text">Your Price</p>
          <p className="productCard__price">${price}</p>
        </div>
        {Children.map(children, (child) =>
          cloneElement(child, {
            fnArguments: {
              productId: id,
            },
            toggleInitialValue: favorite,
            extraClass: 'productCard__buttons',
          })
        )}
      </figcaption>
    </figure>
  )
})

ProductCard.Options = ButtonList
ProductCard.displayName = 'ProductCard'

export default ProductCard
