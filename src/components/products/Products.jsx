import { Children, cloneElement, useContext } from 'react';
import { StoreContext } from '../../utils/StoreContext';
import './Products.scss';

const Product = ({ product, children }) => {
  const { image, price, description, name } = product;
  return (
    <figure className="product">
      {image ? (
        <img src={`${image}`} alt={description} className="product__image" />
      ) : (
        <div className="product__image product__image--empty"></div>
      )}
      <figcaption className="product__description">
        <p className="product__title">{name}</p>
        <div className="product__price">
          <p className="italic">Your Price</p>
          <h3>${price}</h3>
        </div>
        {Children.map(children, child =>
          cloneElement(child, {
            product,
          })
        )}
      </figcaption>
    </figure>
  );
};

const ProductOptions = ({ children = [], product }) => {
  return (
    <div className="product__buttons">
      {children.map(option => {
        return (
          <button
            key={option.click}
            onClick={() => option.click(product)}
            className={`btn ${option.extraClass ?? ''}`}
          >
            {option.icon && (
              <img src={`./icons/${option.icon}.svg`} alt={option.icon} />
            )}
            {option.title}
          </button>
        );
      })}
    </div>
  );
};

Product.displayName = 'Product';
Product.Options = ProductOptions;

const Products = () => {
  const {
    products: productsList,
    addToCart,
    addToFavorites,
  } = useContext(StoreContext);

  const options = [
    {
      click: addToFavorites,
      icon: 'favorite',
      extraClass: 'light',
    },
    {
      click: addToCart,
      title: 'Add to Cart',
      extraClass: 'primary',
    },
  ];

  return (
    <div className="products">
      {productsList.map(product => (
        <Product key={product.id} product={product}>
          <Product.Options>{options}</Product.Options>
        </Product>
      ))}
    </div>
  );
};

export default Products;
