import axios from 'axios'
import mockService from './mockHouses'

const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.intern.d-tt.nl/api'
const API_KEY = import.meta.env.VITE_API_KEY || ''

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
})

async function safeRequest(requestFn, fallbackFn, ...args) {
  try {
    return await requestFn(...args)
  } catch (error) {
    console.warn("API unreachable, using mock data.", error.message)
    return await fallbackFn(...args)
  }
}

export default {
  listHouses: (params) => safeRequest(
    () => client.get('/houses', { params }),
    () => mockService.listHouses(params)
  ),
  getHouse: (id) => safeRequest(
    () => client.get(`/houses/${id}`),
    () => mockService.getHouse(id)
  ),
  createHouse: (payload) => safeRequest(
    () => client.post('/houses', payload),
    () => mockService.createHouse(payload)
  ),
  updateHouse: (id, payload) => safeRequest(
    () => client.put(`/houses/${id}`, payload),
    () => mockService.updateHouse(id, payload)
  ),
  deleteHouse: (id) => safeRequest(
    () => client.delete(`/houses/${id}`),
    () => mockService.deleteHouse(id)
  )
}
