import Section from 'components/common/layouts/section/Section'
import ProductsGrid from 'components/products/productcsGrid/ProductsGrid'
import { useStore } from 'provider/StoreContext'

const Home = () => {
  const {
    state: { sectionTitle },
  } = useStore()

  return (
    <Section title={sectionTitle}>
      <ProductsGrid />
    </Section>
  )
}

export default Home
