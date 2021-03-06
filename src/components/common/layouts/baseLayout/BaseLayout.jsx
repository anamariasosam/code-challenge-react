import Header from 'components/common/header/Header'
import Navbar from 'components/common/navbar/Navbar'
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
