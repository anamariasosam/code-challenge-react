import axios from 'axios'

export const PRODUCT_API = Object.freeze({
  url: 'https://demo5514996.mockable.io',
  endpoints: {
    default: 'products',
    products: 'products',
    favorites: 'favorites',
  },
})

export const SERVER_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
}

class Api {
  constructor(apiData) {
    this.apiData = apiData
    this.productsApi = axios.create({
      baseURL: apiData.url,
    })
  }

  get = (resource) => {
    const id = resource ?? this.apiData.endpoints.default
    return this.productsApi.get(`${this.apiData.endpoints[id]}`)
  }

  post = (resource, data) => {
    const id = resource ?? this.apiData.endpoints.default
    return this.productsApi.post(`${this.apiData.endpoints[id]}`, data)
  }

  delete = (resource, data) => {
    const id = resource ?? this.apiData.endpoints.default
    return this.productsApi.delete(`${this.apiData.endpoints[id]}`, data)
  }
}

export const productsApi = new Api(PRODUCT_API)
