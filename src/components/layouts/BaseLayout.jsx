import Header from '../common/header/Header'
import NavBar from '../common/navBar/NavBar'
import './BaseLayout.scss'

const BaseLayout = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar />
      <div className="baseLayout">{children}</div>
    </>
  )
}

export default BaseLayout
