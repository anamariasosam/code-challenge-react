// import Cart from './components/cart/Cart'
import BaseLayout from './components/common/layouts/BaseLayout'
import Home from './routes/home/Home'
import { StoreProvider } from './utils/StoreContext'
import './_styles.scss'

function App() {
  return (
    <StoreProvider>
      <BaseLayout>
        <Home />
      </BaseLayout>
    </StoreProvider>
  )
}

export default App
