import { useContext, useState } from 'react'
import { StoreContext } from '../../../utils/StoreContext'
import { Button } from '../button/Button'
import Searchbar from '../searchBar/SearchBar'
import './_Navbar.scss'

const Navbar = () => {
  const { changeGridView } = useContext(StoreContext)
  const [activeTab, setActiveTab] = useState()

  const searchItem = (e) => {
    console.log(e)
  }

  const navbarLinks = [
    {
      type: 'favorites',
      title: 'Favourites',
      icon: 'favorite',
      onClickFn: changeGridView,
      toggleFn: changeGridView,
      toggleIcon: false,
    },
    {
      type: 'cart',
      title: 'Cart',
      icon: 'cart',
      onClickFn: changeGridView,
      toggleFn: changeGridView,
      toggleIcon: false,
    },
  ]

  return (
    <nav className="navbar" role="navigation">
      <Searchbar onSubmit={searchItem} onChange={searchItem}></Searchbar>
      <ul className="navbar__links" role="menubar">
        {navbarLinks.map(({ icon, onClickFn, toggleFn, toggleIcon, type, title }) => {
          const handleTabChange = () => {
            if (activeTab === type) {
              onClickFn()
              setActiveTab()
              document.title = `Sowingo | Interview Challenge`
            } else {
              onClickFn(type)
              setActiveTab(type)
              document.title = `Sowingo | ${title}`
            }
          }
          return (
            <li
              key={icon}
              className={`navbar__item ${activeTab === type ? 'navbar__item--active' : ''}`}
              role="menuitem"
            >
              <Button
                onClickFn={handleTabChange}
                icon={icon}
                toggleFn={handleTabChange}
                toggleIcon={toggleIcon}
                title={title}
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
