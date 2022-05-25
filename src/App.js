import Cart from './components/cart/Cart';
import Products from './components/products/Products';
import { StoreProvider } from './utils/StoreContext';
import './App.scss';

function App() {
  return (
    <StoreProvider>
      <Cart />
      <section className="main">
        <Products />
      </section>
    </StoreProvider>
  );
}

export default App;
