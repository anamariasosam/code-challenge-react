import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { FILTER, PRODUCTS_ACTION } from 'utils/constants'
import {
  calculateCartTotal,
  changeProductQuantity,
  fetchProducts,
  getGridProducts,
  toggleProductFavoriteStatus,
  addToFavorites,
  removeFromFavorites,
} from 'utils/productsUtils'
import { removeExtraSpaces } from 'utils/searchUtils'

const StoreContext = createContext()

const productsReducer = (state, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION.API_RESPONSE: {
      return { ...state, ...action.payload }
    }
    case PRODUCTS_ACTION.MODIFY_CART: {
      return { ...state, products: changeProductQuantity(state.products, action.payload) }
    }
    case PRODUCTS_ACTION.CHANGE_FAVORITE: {
      return { ...state, products: toggleProductFavoriteStatus(state.products, action.payload) }
    }
    default: {
      return { ...state }
    }
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: [],
  })
  const [filter, setFilter] = useState(FILTER.DEFAULT)
  const [search, setSearch] = useState('')
  const cartTotal = useMemo(() => calculateCartTotal(state.products), [state.products])
  const gridProducts = useMemo(
    () => getGridProducts(state.products, filter, search),
    [state.products, filter, search]
  )

  useEffect(() => {
    fetchProducts(dispatch)
  }, [])

  const changeGridView = (type) => {
    setFilter(type)
    document.title = `Sowingo | ${type.toUpperCase()}`
  }

  const filterBySearch = (searchKeyWord) => {
    setSearch(removeExtraSpaces(searchKeyWord))
  }

  const value = {
    state: {
      sectionTitle: filter,
      ...state,
      cartTotal,
      gridProducts,
      changeGridView,
      filterBySearch,
    },
    dispatch,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

const useStore = () => {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

export { StoreProvider, useStore, addToFavorites, removeFromFavorites }
