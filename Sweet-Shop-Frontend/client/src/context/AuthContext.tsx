import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/lib/mockData";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem("sweet_shop_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("sweet_shop_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await api.login(username, password);
      setUser(data.user);
      localStorage.setItem("sweet_shop_user", JSON.stringify(data.user));
      localStorage.setItem("sweet_shop_token", data.token);
      toast({ title: "Welcome back!", description: `Logged in as ${data.user.username}` });
    } catch (error) {
      toast({ variant: "destructive", title: "Login failed", description: "Invalid credentials" });
      throw error;
    }
  };

  const register = async (username: string, password: string, email: string) => {
    try {
      const data = await api.register(username, password, email);
      setUser(data.user);
      localStorage.setItem("sweet_shop_user", JSON.stringify(data.user));
      localStorage.setItem("sweet_shop_token", data.token);
      toast({ title: "Welcome!", description: "Account created successfully" });
    } catch (error) {
      toast({ variant: "destructive", title: "Registration failed", description: "Could not create account" });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sweet_shop_user");
    localStorage.removeItem("sweet_shop_token");
    toast({ title: "Logged out", description: "Come back soon!" });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
