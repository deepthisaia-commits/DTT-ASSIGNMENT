// Mock API service with sample data
const mockHouses = [
  {
    id: 1,
    address: {
      street: "Damrak",
      number: "123",
      addition: "A",
      postalCode: "1012 LP",
      city: "Amsterdam"
    },
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Beautiful canal house in the heart of Amsterdam with stunning views and modern amenities.",
    price: 750000,
    size: 120,
    bedrooms: 3,
    bathrooms: 2,
    constructionYear: 1890,
    garage: false
  },
  {
    id: 2,
    address: {
      street: "Prinsengracht",
      number: "456",
      addition: "",
      postalCode: "1016 HK",
      city: "Amsterdam"
    },
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Charming historic house with original features and modern updates.",
    price: 950000,
    size: 150,
    bedrooms: 4,
    bathrooms: 2,
    constructionYear: 1850,
    garage: true
  },
  {
    id: 3,
    address: {
      street: "Vondelstraat",
      number: "78",
      addition: "",
      postalCode: "1054 GE",
      city: "Amsterdam"
    },
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Modern apartment near Vondelpark with great amenities.",
    price: 650000,
    size: 95,
    bedrooms: 2,
    bathrooms: 1,
    constructionYear: 2010,
    garage: false
  },
  {
    id: 4,
    address: {
      street: "Jordaan",
      number: "234",
      addition: "B",
      postalCode: "1015 MN",
      city: "Amsterdam"
    },
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Cozy house in the trendy Jordaan neighborhood.",
    price: 850000,
    size: 110,
    bedrooms: 3,
    bathrooms: 2,
    constructionYear: 1920,
    garage: false
  },
  {
    id: 5,
    address: {
      street: "Herengracht",
      number: "567",
      addition: "",
      postalCode: "1017 CE",
      city: "Amsterdam"
    },
    image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Luxury canal house with premium finishes and canal views.",
    price: 1200000,
    size: 200,
    bedrooms: 5,
    bathrooms: 3,
    constructionYear: 1880,
    garage: true
  },
  {
    id: 6,
    address: {
      street: "Nieuwmarkt",
      number: "89",
      addition: "",
      postalCode: "1011 KE",
      city: "Amsterdam"
    },
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Historic building converted to modern living space.",
    price: 700000,
    size: 85,
    bedrooms: 2,
    bathrooms: 1,
    constructionYear: 1750,
    garage: false
  }
];

let nextId = 7;

// Helper function to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export default {
  async listHouses(params = {}) {
    await delay(300); // Simulate network delay
    
    let filteredHouses = [...mockHouses];
    
    // Search functionality
    if (params.q) {
      const query = params.q.toLowerCase();
      filteredHouses = filteredHouses.filter(house => 
        house.address.street.toLowerCase().includes(query) ||
        house.address.city.toLowerCase().includes(query) ||
        house.address.postalCode.toLowerCase().includes(query)
      );
    }
    
    // Sorting
    if (params._sort) {
      switch (params._sort) {
        case 'price_asc':
          filteredHouses.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredHouses.sort((a, b) => b.price - a.price);
          break;
        case 'size_desc':
          filteredHouses.sort((a, b) => b.size - a.size);
          break;
      }
    }
    
    // Pagination
    const page = params._page || 1;
    const limit = params._limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedHouses = filteredHouses.slice(startIndex, endIndex);
    
    return {
      data: paginatedHouses
    };
  },

  async getHouse(id) {
    await delay(200);
    const house = mockHouses.find(h => h.id == id);
    if (!house) {
      throw new Error('House not found');
    }
    return { data: house };
  },

  async createHouse(payload) {
    await delay(400);
    const newHouse = {
      ...payload,
      id: nextId++
    };
    mockHouses.push(newHouse);
    return { data: newHouse };
  },

  async updateHouse(id, payload) {
    await delay(300);
    const index = mockHouses.findIndex(h => h.id == id);
    if (index === -1) {
      throw new Error('House not found');
    }
    mockHouses[index] = { ...mockHouses[index], ...payload };
    return { data: mockHouses[index] };
  },

  async deleteHouse(id) {
    await delay(300);
    const index = mockHouses.findIndex(h => h.id == id);
    if (index === -1) {
      throw new Error('House not found');
    }
    const deletedHouse = mockHouses.splice(index, 1)[0];
    return { data: deletedHouse };
  }
};