import { Sweet, User } from "@/lib/mockData";

const API_URL = "http://localhost:8080/api";

class ApiService {
  private token: string | null = null;

  private getHeaders() {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    // Always read token from localStorage to persist across page refreshes
    const token = localStorage.getItem("sweet_shop_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  // Auth
  async login(username: string, password: string): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    const data = await res.json();
    this.token = data.token;
    return { user: { id: 1, username: data.username, email: data.username, role: data.role.replace('ROLE_', '').toLowerCase() }, token: data.token };
  }

  async register(username: string, password: string, email: string): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role: "USER" }),
    });
    if (!res.ok) throw new Error("Registration failed");
    const data = await res.json();
    this.token = data.token;
    return { user: { id: 1, username: data.username, email: data.username, role: data.role.replace('ROLE_', '').toLowerCase() }, token: data.token };
  }

  // Sweets
  async getSweets(query?: string): Promise<Sweet[]> {
    // Always use mock data first
    try {
      const { MOCK_SWEETS } = await import('@/lib/mockData');
      let sweets = [...MOCK_SWEETS]; // Create a copy of the array
      
      // Filter by query if provided
      if (query) {
        const lowerQuery = query.toLowerCase();
        sweets = sweets.filter(sweet => 
          sweet.name.toLowerCase().includes(lowerQuery) || 
          sweet.description.toLowerCase().includes(lowerQuery) ||
          sweet.category.toLowerCase().includes(lowerQuery)
        );
      }
      
      // Ensure all images are valid URLs
      sweets = sweets.map(sweet => ({
        ...sweet,
        imageUrl: sweet.imageUrl || 'https://i.imgur.com/8kQ9X9d.jpg'
      }));
      
      return sweets;
    } catch (error) {
      console.error('Error loading mock data:', error);
      return [];
    }
  }

  async addSweet(sweet: Omit<Sweet, 'id'>): Promise<Sweet> {
    const res = await fetch(`${API_URL}/sweets`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(sweet),
    });
    if (!res.ok) throw new Error("Failed to add sweet");
    return res.json();
  }

  async updateSweet(id: number, updates: Partial<Sweet>): Promise<Sweet> {
    const res = await fetch(`${API_URL}/sweets/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update sweet");
    return res.json();
  }

  async deleteSweet(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/sweets/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete sweet");
  }

  async placeOrder(items: { id: number; quantity: number }[]): Promise<any> {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(items),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.message || "Order placement failed";
      throw new Error(errorMessage);
    }
    return res.json();
  }

  async getAnalytics() {
    const res = await fetch(`${API_URL}/analytics`, { headers: this.getHeaders() });
    if (!res.ok) throw new Error("Failed to fetch analytics");
    return res.json();
  }

  async getOrders(): Promise<any[]> {
    const res = await fetch(`${API_URL}/orders`, { headers: this.getHeaders() });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  }
}

export const api = new ApiService();
