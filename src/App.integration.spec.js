import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { productsApi } from 'utils/api'
import App from './App'

jest.mock('utils/api')

describe('StoreApp - Integration', () => {
  const product1Name =
    '2% Xylocaine Dental with Epinephrine Lidocaine HCl, 50/Pkg 1:50,000, NDC 66312-0181-16'
  const product2Name = 'Arestin (minocycline HCl) Microspheres, 1mg, 12 Carp/Bx'

  const setup = async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getAllByText('Add To Cart')[1]).toBeInTheDocument()
    })
  }

  describe('Cart', () => {
    it('should update cart bubble when a product is added to the cart', async () => {
      await setup()
      expect(screen.getByTestId('cartBubble')).toHaveTextContent(0)

      // Add product to cart
      fireEvent.click(screen.getAllByText('Add To Cart')[1])
      fireEvent.click(screen.getAllByText('Add To Cart')[1])

      // Validate two products in the cart bubble
      expect(screen.getByTestId('cartBubble')).toHaveTextContent(2)
    })

    it('should filter products by items added to the cart', async () => {
      await setup()

      fireEvent.click(screen.getAllByText('Add To Cart')[1])
      fireEvent.click(screen.getByRole('button', { name: /Go to Cart Items/ }))

      expect(screen.queryByText(product1Name)).not.toBeInTheDocument()
      expect(screen.getByText(product2Name)).toBeInTheDocument()
      expect(screen.getByText('Remove From Cart')).toBeInTheDocument()
    })

    it('should remove a product from the cart', async () => {
      await setup()

      fireEvent.click(screen.getAllByText('Add To Cart')[1])
      fireEvent.click(screen.getByRole('button', { name: /Go to Cart Items/ }))

      expect(screen.getByText(product2Name)).toBeInTheDocument()
      fireEvent.click(screen.getByText('Remove From Cart'))
      expect(screen.queryByText(product2Name)).not.toBeInTheDocument()
    })
  })

  describe('Search', () => {
    it('should search a product by name', async () => {
      await setup()
      expect(screen.getAllByText('Add To Cart').length).toBe(2)

      // Simulate search by Microspheres
      userEvent.type(
        screen.getByPlaceholderText('Search by product name, manufacturer, SKU, keyword..', {
          exact: false,
        }),
        'Microspheres'
      )
      userEvent.tab()

      await waitFor(() => {
        expect(screen.queryByText(product1Name)).not.toBeInTheDocument()
      })

      expect(screen.getAllByText('Add To Cart').length).toBe(1)
    })

    it('should an empty list when no products found after search', async () => {
      await setup()
      expect(screen.getAllByText('Add To Cart').length).toBe(2)
      const wrongProductName = 'WRONG'
      userEvent.type(
        screen.getByPlaceholderText('Search by product name, manufacturer, SKU, keyword..', {
          exact: false,
        }),
        wrongProductName
      )
      userEvent.tab()

      await waitFor(() => {
        expect(screen.queryByText(product1Name)).not.toBeInTheDocument()
      })
      expect(screen.queryByText(product2Name)).not.toBeInTheDocument()
      expect(screen.getByText('No products found.')).toBeInTheDocument()
    })
  })

  describe('Favorites', () => {
    const markAProductAsFavorite = async () => {
      const promise = Promise.resolve({ data: { favorite: true }, status: 200 }) // You can also resolve with a mocked return value if necessary
      jest.spyOn(productsApi, 'post').mockImplementationOnce(() => promise)
      await setup()

      // Click on favorite icon
      fireEvent.click(screen.getAllByRole('button', { name: /toggle favorite/ })[0])
      await act(async () => {
        await promise
      })
    }

    it('should add a product to favorites', async () => {
      await markAProductAsFavorite()

      // Change to favorites section
      fireEvent.click(screen.getByRole('button', { name: /Go to favorites/ }))
      expect(screen.getByText('favourites')).toBeInTheDocument()
      await waitFor(() => {
        expect(screen.queryByText(product2Name)).not.toBeInTheDocument()
      })
      expect(screen.getByText(product1Name)).toBeInTheDocument()
    })

    it('should remove a product from favorites', async () => {
      await markAProductAsFavorite()
      fireEvent.click(screen.getByRole('button', { name: /Go to favorites/ }))
      await waitFor(() => {
        expect(screen.queryByText(product2Name)).not.toBeInTheDocument()
      })

      fireEvent.click(screen.getAllByRole('button', { name: /toggle favorite/ })[0])

      await waitFor(() => {
        expect(screen.queryByText(product1Name)).not.toBeInTheDocument()
      })

      expect(screen.getByText('No products found.')).toBeInTheDocument()
    })
  })
})
