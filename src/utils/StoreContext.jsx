import { createContext, useEffect, useMemo, useState } from 'react';
import { productsApi, PRODUCT_API, SERVER_STATUS } from './api';

export const StoreContext = createContext();

const calculateCartTotal = cartItems => {
  return Object.values(cartItems).reduce((acc, { total }) => acc + total, 0);
};

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const cartTotal = useMemo(
    () => Number(calculateCartTotal(cartItems)).toFixed(2),
    [cartItems]
  );

  const addToCart = product => {
    const quantity = (cartItems[product.id]?.quantity ?? 0) + 1;
    const updatedProduct = {
      ...product,
      total: quantity * product.price,
      quantity,
    };
    setCartItems(oldCartItems => ({
      ...oldCartItems,
      [product.id]: updatedProduct,
    }));
  };

  useEffect(() => {
    productsApi.get().then(({ data, status }) => {
      if (status === SERVER_STATUS.OK) {
        console.log(data.hits);

        const products = data.hits.map(
          ({ main_image, name, vendor_inventory, id }) => ({
            name,
            image: main_image,
            price: vendor_inventory[0].price,
            id,
          })
        );

        setProducts(products);
      }
    });
  }, []);

  const addToFavorites = product => {
    console.log(product);
    const data = {
      id: '5DPzct4f2guBF5dD2LKxpS',

      favorite: true,
    };

    productsApi
      .post(PRODUCT_API.endpoints.favorites, data)
      .then(({ status, ...rest }) => {
        if (status === SERVER_STATUS.OK) {
          console.log(rest);
          productsApi.get().then(({ data, status }) => {
            if (status === SERVER_STATUS.OK) {
              console.log(data.hits);
            }
          });
        }
      });
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        cartTotal,
        addToFavorites,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
