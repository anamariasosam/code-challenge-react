import { mockedProducts } from './mockedProducts'

class Api {
  get = () => {
    return Promise.resolve({ data: mockedProducts, status: 200 })
  }

  post = () => {
    return new Promise((res) => {
      res({ data: { favorite: true }, status: 200 })
    })
  }

  delete = () => {
    return new Promise((res) => {
      res({ data: { favorite: false }, status: 200 })
    })
  }
}

export const productsApi = new Api()
