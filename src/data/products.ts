export interface Product {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    description: 'Experience crystal clear sound with our top-of-the-line wireless headphones. Features active noise cancellation and 30-hour battery life.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    category: 'Electronics',
  },
  {
    id: '2',
    title: 'Minimalist Watch',
    description: 'A sleek and modern timepiece for the urban professional. Water-resistant and built with sapphire crystal glass.',
    price: 149.50,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    category: 'Accessories',
  },
  {
    id: '3',
    title: 'Ergonomic Office Chair',
    description: 'Work in comfort with this fully adjustable ergonomic chair. Lumbar support and breathable mesh back.',
    price: 349.00,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80',
    category: 'Furniture',
  },
  {
    id: '4',
    title: 'Smart Fitness Tracker',
    description: 'Track your health metrics, sleep patterns, and workouts with precision. Waterproof and lightweight design.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80',
    category: 'Electronics',
  },
  {
    id: '5',
    title: 'Leather Messenger Bag',
    description: 'Handcrafted from genuine leather, this bag is perfect for carrying your laptop and essentials in style.',
    price: 199.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    category: 'Accessories',
  },
  {
    id: '6',
    title: 'Ceramic Coffee Set',
    description: 'Elevate your morning ritual with this artisanal ceramic coffee set. Includes 4 cups and a pouring jug.',
    price: 59.95,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
    category: 'Home',
  },
]
