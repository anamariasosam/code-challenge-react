import { useCallback, useState } from 'react'
import { FILTER } from 'utils/constants'
import { useStore } from 'provider/StoreContext'
import CartBubble from 'components/products/cartBubble/CartBubble'
import { Button } from 'components/common/button/Button'
import Searchbar from 'components/common/searchBar/SearchBar'
import './_Navbar2.scss'

const Navbar = () => {
  const {
    state: { changeGridView, sectionTitle, filterBySearch },
  } = useStore()
  const [activeTab, setActiveTab] = useState()

  const navbarLinks = [
    {
      title: 'Favourites',
      icon: 'favorite',
      filterBy: FILTER.FAVORITES,
      onClickFn: changeGridView,
      toggleFn: changeGridView,
      toggleIcon: false,
    },
    {
      title: 'Cart',
      icon: 'cart',
      filterBy: FILTER.CART_ITEMS,
      onClickFn: changeGridView,
      toggleFn: changeGridView,
      extraClass: 'button--dynamicIcon',
      toggleIcon: false,
      children: <CartBubble />,
    },
  ]

  const handleTabChange = useCallback(
    (filterBy, onClickFn, title) => {
      if (activeTab === filterBy) {
        onClickFn(FILTER.DEFAULT)
        setActiveTab()
        document.title = 'Sowingo | Interview Challenge'
      } else {
        onClickFn(filterBy)
        setActiveTab(filterBy)
        document.title = `Sowingo | ${title}`
      }
    },
    [activeTab]
  )

  return (
    <nav className="navbar" role="navigation">
      <Searchbar onChange={filterBySearch}></Searchbar>
      <ul className="navbar__links" role="menubar">
        {navbarLinks.map(({ icon, onClickFn, filterBy, title, children, extraClass }) => {
          return (
            <li
              key={icon}
              className={`navbar__item ${sectionTitle === filterBy ? 'navbar__item--active' : ''}`}
              role="menuitem"
            >
              <Button
                onClickFn={() => handleTabChange(filterBy, onClickFn, title)}
                icon={icon}
                toggleIcon={false}
                title={title}
                extraClass={extraClass}
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
