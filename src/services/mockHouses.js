// Mock data for houses
const mockHouses = [
  { id: 1, name: "Cozy Apartment", price: 1200, location: "Amsterdam" },
  { id: 2, name: "Modern Loft", price: 1800, location: "Rotterdam" },
]

export default {
  listHouses: async () => ({ data: mockHouses }),
  getHouse: async (id) => ({ data: mockHouses.find(h => h.id === Number(id)) }),
  createHouse: async (payload) => {
    const newHouse = { id: Date.now(), ...payload }
    mockHouses.push(newHouse)
    return { data: newHouse }
  },
  updateHouse: async (id, payload) => {
    const index = mockHouses.findIndex(h => h.id === Number(id))
    if (index !== -1) mockHouses[index] = { ...mockHouses[index], ...payload }
    return { data: mockHouses[index] }
  },
  deleteHouse: async (id) => {
    const index = mockHouses.findIndex(h => h.id === Number(id))
    if (index !== -1) mockHouses.splice(index, 1)
    return { data: true }
  }
}
