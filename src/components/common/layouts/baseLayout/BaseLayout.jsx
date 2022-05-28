import Header from '../../header/Header'
import Navbar from '../../navbar/Navbar'
import './_BaseLayout.scss'

const BaseLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <main role="main" className="baseLayout">
        {children}
      </main>
    </>
  )
}

export default BaseLayout
