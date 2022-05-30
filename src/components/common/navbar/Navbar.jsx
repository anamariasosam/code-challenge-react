import { useCallback } from 'react'
import { FILTER } from 'utils/constants'
import { useStore } from 'provider/StoreContext'
import CartBubble from 'components/products/cartBubble/CartBubble'
import { Button } from 'components/common/button/Button'
import Searchbar from 'components/common/searchBar/SearchBar'
import './_Navbar.scss'

const Navbar = () => {
  const {
    state: { changeGridView, sectionTitle, filterBySearch },
  } = useStore()

  const navbarLinks = [
    {
      title: 'Favourites',
      icon: 'favorite',
      name: 'Go to favorites',
      filterBy: FILTER.FAVORITES,
      onClickFn: changeGridView,
    },
    {
      title: 'Cart',
      icon: 'cart',
      name: 'Go to Cart Items',
      filterBy: FILTER.CART_ITEMS,
      onClickFn: changeGridView,
      extraClass: 'button--dynamicIcon',
      children: <CartBubble />,
    },
  ]

  const handleTabChange = useCallback((filterBy, onClickFn, sectionTitle) => {
    if (filterBy.toLowerCase() === sectionTitle.toLowerCase()) {
      onClickFn(FILTER.DEFAULT)
    } else {
      onClickFn(filterBy)
    }
  }, [])

  return (
    <nav className="navbar" role="navigation">
      <Searchbar onChange={filterBySearch}></Searchbar>
      <ul className="navbar__links" role="menubar">
        {navbarLinks.map(({ icon, onClickFn, filterBy, title, children, extraClass, name }) => {
          return (
            <li
              key={icon}
              className={`navbar__item ${sectionTitle === filterBy ? 'navbar__item--active' : ''}`}
              role="menuitem"
            >
              <Button
                onClickFn={() => handleTabChange(filterBy, onClickFn, sectionTitle)}
                icon={icon}
                toggleIcon={false}
                title={title}
                extraClass={extraClass}
                name={name}
              >
                {children}
              </Button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
