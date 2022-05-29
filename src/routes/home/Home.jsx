import { useContext } from 'react'
import Section from '../../components/common/layouts/section/Section'
import ProductsGrid from '../../components/products/productcsGrid/ProductsGrid'
import { StoreContext } from '../../utils/StoreContext'

const Home = () => {
  const { gridTitle } = useContext(StoreContext)

  return (
    <Section title={gridTitle}>
      <ProductsGrid />
    </Section>
  )
}

export default Home
