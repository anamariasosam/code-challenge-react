import Header from '../header/Header'
import NavBar from '../navBar/NavBar'
import './BaseLayout.scss'

const BaseLayout = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar />
      <main className="baseLayout">{children}</main>
    </>
  )
}

export default BaseLayout
