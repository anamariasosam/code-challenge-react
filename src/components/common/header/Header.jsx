import { useStore } from 'provider/StoreContext'
import { FILTER } from 'utils/constants'
import './_Header.scss'

const Header = () => {
  const {
    state: { changeGridView },
  } = useStore()

  const goToHome = () => {
    changeGridView(FILTER.DEFAULT)
  }
  return (
    <header className="header">
      <img
        className="header__logo"
        src="images/sowingo_logo.svg"
        alt="sowingo logo"
        onClick={goToHome}
      />
    </header>
  )
}

export default Header
