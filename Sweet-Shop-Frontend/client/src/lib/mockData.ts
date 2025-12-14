
// Types
export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number; // Mapped from backend 'quantity'
  imageUrl: string;
}

export interface CartItem extends Sweet {
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'customer';
}

// Mock Data Generators

const CATEGORIES = ['Chocolates', 'Gummies', 'Hard Candies', 'Pastries', 'Fudge'];

export const MOCK_SWEETS: Sweet[] = [
  {
    id: 1,
    name: "Golden Honeycomb Truffle",
    category: "Chocolates",
    price: 2.50,
    description: "Rich dark chocolate filled with golden honeycomb crunch.",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Rainbow Sour Belts",
    category: "Gummies",
    price: 1.20,
    description: "Tangy and sweet multicolored sour belts.",
    stock: 120,
    imageUrl: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Vanilla Bean Fudge",
    category: "Fudge",
    price: 3.00,
    description: "Creamy, handmade fudge with real vanilla beans.",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Raspberry Rose Macaron",
    category: "Pastries",
    price: 2.75,
    description: "Delicate almond meringue cookies with raspberry rose filling.",
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Sea Salt Caramel Chews",
    category: "Chocolates",
    price: 1.50,
    description: "Soft caramels wrapped in milk chocolate with a pinch of sea salt.",
    stock: 80,
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Lemon Drop Hard Candy",
    category: "Hard Candies",
    price: 0.50,
    description: "Classic refreshing lemon flavored hard candies.",
    stock: 200,
    imageUrl: "https://i.imgur.com/4Q2KjJc.jpg"
  },
  {
    id: 7,
    name: "Milk Chocolate Bar",
    category: "Chocolates",
    price: 2.00,
    description: "Creamy milk chocolate bar with a smooth texture.",
    stock: 60,
    imageUrl: "https://i.imgur.com/8kQ9X9d.jpg"
  },
  {
    id: 8,
    name: "Dark Chocolate Truffles",
    category: "Chocolates",
    price: 3.50,
    description: "Rich dark chocolate truffles with a soft ganache center.",
    stock: 40,
    imageUrl: "https://i.imgur.com/7KXJx9k.jpg"
  },
  {
    id: 9,
    name: "Oatmeal Raisin Cookies",
    category: "Pastries",
    price: 1.75,
    description: "Classic oatmeal cookies with plump raisins and a hint of cinnamon.",
    stock: 35,
    imageUrl: "https://i.imgur.com/5R8c9YD.jpg"
  },
  {
    id: 10,
    name: "Jelly Beans",
    category: "Hard Candies",
    price: 1.20,
    description: "Assorted fruit-flavored jelly beans in a rainbow of colors.",
    stock: 150,
    imageUrl: "https://i.imgur.com/9yT3hJk.jpg"
  }
];

export const MOCK_ANALYTICS = [
  { name: 'Jan', sales: 4000, stock: 2400 },
  { name: 'Feb', sales: 3000, stock: 1398 },
  { name: 'Mar', sales: 2000, stock: 9800 },
  { name: 'Apr', sales: 2780, stock: 3908 },
  { name: 'May', sales: 1890, stock: 4800 },
  { name: 'Jun', sales: 2390, stock: 3800 },
  { name: 'Jul', sales: 3490, stock: 4300 },
];

export const MOCK_USERS: User[] = [
  { id: 1, username: 'admin', email: 'admin@sweetshop.com', role: 'admin' },
  { id: 2, username: 'customer', email: 'user@example.com', role: 'customer' }
];
