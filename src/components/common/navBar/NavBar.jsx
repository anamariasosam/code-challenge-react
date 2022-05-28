import { Button } from '../button/Button'
import Searchbar from '../searchBar/SearchBar'
import './_Navbar.scss'

const Navbar = () => {
  const searchItem = (e) => {
    console.log(e)
  }

  return (
    <nav className="navbar" role="navigation">
      <Searchbar onSubmit={searchItem} onChange={searchItem}></Searchbar>
      <ul className="navbar__links" role="menubar">
        <li className="navbar__item" role="menuitem">
          <Button
            onClickFn={(a) => {
              console.log(a)
            }}
            icon={'favorite'}
            toggleFn={() => {
              console.log('holi')
            }}
            fnArguments={false}
            toggleIcon={false}
          >
            Favourites
          </Button>
        </li>
        <li className="navbar__item" role="menuitem">
          <Button
            onClickFn={(a) => {
              console.log(a)
            }}
            icon={'cart'}
            toggleFn={() => {
              console.log('holi')
            }}
            fnArguments={false}
            toggleIcon={false}
          >
            Cart
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
