/* eslint-disable jest/no-mocks-import */
/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react'
import { RESPONSE } from 'utils/constants'
import { transformProductsFromApi } from 'utils/productsUtils'
import ProductsGrid from '../ProductsGrid'
import { mockedProducts } from 'utils/__mocks__/mockedProducts'
import * as StoreContext from 'provider/StoreContext'

const mockGridProducts = transformProductsFromApi(mockedProducts)
const mockResolved = RESPONSE.RESOLVED

const mockDispatch = jest.fn()
jest.mock('provider/StoreContext', () => {
  return {
    useStore: () => {
      return {
        state: { sectionTitle: 'Promo', status: mockResolved, gridProducts: [mockGridProducts[0]] },
        dispatch: mockDispatch,
      }
    },
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
  }
})

describe('ProductsGrid', () => {
  const setup = () => render(<ProductsGrid />)
  const mockedProductId = '5DPzct4f2guBF5dD2LKxpS'

  it('should display a product', () => {
    setup()
    const product = {
      name: '2% Xylocaine Dental with Epinephrine Lidocaine HCl, 50/Pkg 1:50,000, NDC 66312-0181-16',
      price: '$40.1',
    }
    expect(screen.getAllByText('Add To Cart').length).toBe(1)
    expect(
      screen.getByText(product.name, {
        exact: true,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(product.price, {
        exact: true,
      })
    ).toBeInTheDocument()
  })

  it('should toggle product favorite status', () => {
    const favoriteSpy = jest.spyOn(StoreContext, 'addToFavorites')
    setup()
    const favoriteBtn = screen.getByRole('button', { name: /toggle favorite/ })

    fireEvent.click(favoriteBtn)
    expect(favoriteBtn.lastChild.lastChild).toHaveClass('fu__favorite--on')
    expect(favoriteSpy).toHaveBeenCalledWith(expect.anything(), mockedProductId)

    fireEvent.click(favoriteBtn)
    expect(favoriteBtn.lastChild.lastChild).toHaveClass('fu__favorite--off')
  })

  it('should add a product to cart', () => {
    setup()
    fireEvent.click(screen.getByText(/Add to cart/i))
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { increase: true, productId: mockedProductId },
      type: 'MODIFY_CART',
    })
  })
})
