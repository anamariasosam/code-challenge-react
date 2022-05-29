import { useContext } from 'react'
import Section from 'components/common/layouts/section/Section'
import ProductsGrid from 'components/products/productcsGrid/ProductsGrid'
import { StoreContext } from 'provider/StoreContext'

const Home = () => {
  const { sectionTitle } = useContext(StoreContext)

  return (
    <Section title={sectionTitle}>
      <ProductsGrid />
    </Section>
  )
}

export default Home
