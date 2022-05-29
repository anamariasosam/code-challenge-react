import BaseLayout from 'components/common/layouts/baseLayout/BaseLayout'
import Home from 'routes/home/Home'
import { StoreProvider } from 'provider/StoreContext'
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
