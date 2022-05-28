import { Button } from '../button/Button'
import './Navbar.scss'

const Searchbar = ({ onChange }) => {
  return (
    <div className="searchbar">
      <i className="fu fu__search searchbar__icon"></i>
      <input
        type="text"
        className="searchbar__input"
        name="searchText"
        onChange={onChange}
        placeholder="Search by product name, manufacturer, SKU, keyword..."
      />
    </div>
  )
}

const Navbar = () => {
  const searchItem = (e) => {
    console.log(e)
  }

  return (
    <nav className="navbar">
      <Searchbar onSubmit={searchItem} onChange={searchItem}></Searchbar>
      <ul className="navbar__links">
        <li className="navbar__item">
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
        <li className="navbar__item">
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
