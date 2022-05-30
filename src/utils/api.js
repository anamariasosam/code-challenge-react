import axios from 'axios'
import { PRODUCT_API } from './constants'


class Api {
  constructor(apiData) {
    this.apiData = apiData
    this.api = axios.create({
      baseURL: apiData.url,
    })
  }

  get = (resource) => {
    const id = resource ?? this.apiData.endpoints.default
    return this.api.get(`${this.apiData.endpoints[id]}`)
  }

  post = (resource, data) => {
    const id = resource ?? this.apiData.endpoints.default
    return this.api.post(`${this.apiData.endpoints[id]}`, data)
  }

  delete = (resource, data) => {
    const id = resource ?? this.apiData.endpoints.default
    return this.api.delete(`${this.apiData.endpoints[id]}`, data)
  }
}

export const productsApi = new Api(PRODUCT_API)
