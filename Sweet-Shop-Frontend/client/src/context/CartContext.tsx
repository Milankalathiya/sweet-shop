import React, { createContext, useContext, useState, useEffect } from "react";
import { Sweet, CartItem } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

interface CartContextType {
  cart: CartItem[];
  addToCart: (sweet: Sweet, quantity?: number) => void;
  removeFromCart: (sweetId: number) => void;
  updateQuantity: (sweetId: number, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Persist cart
  useEffect(() => {
    const storedCart = localStorage.getItem("sweet_shop_cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        localStorage.removeItem("sweet_shop_cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sweet_shop_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (sweet: Sweet, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === sweet.id);
      if (existing) {
        // Check if adding exceeds stock
        if (existing.quantity + quantity > sweet.stock) {
          toast({ variant: "destructive", title: "Stock limit reached", description: "Cannot add more of this item." });
          return prev;
        }
        return prev.map(item =>
          item.id === sweet.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...sweet, quantity }];
    });
    toast({ title: "Added to cart", description: `${quantity}x ${sweet.name}` });
  };

  const removeFromCart = (sweetId: number) => {
    setCart(prev => prev.filter(item => item.id !== sweetId));
  };

  const updateQuantity = (sweetId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sweetId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === sweetId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const checkout = async () => {
    try {
      const items = cart.map(item => ({ id: item.id, quantity: item.quantity }));
      await api.placeOrder(items);
      clearCart();
      // Refresh orders list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({ title: "Order placed!", description: "Thank you for your purchase." });
    } catch (error: any) {
      // If items are not found (stale cart data), clear the cart
      const errorMessage = error?.message || "";
      if (errorMessage.includes("not found") || errorMessage.includes("Sweet not found")) {
        clearCart();
        toast({
          variant: "destructive",
          title: "Cart cleared",
          description: "Your cart had outdated items. Please add items again from the shop."
        });
      } else {
        toast({
          variant: "destructive",
          title: "Checkout failed",
          description: "Some items may be out of stock or unavailable."
        });
      }
      // Don't throw - let the caller handle it gracefully
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, checkout, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
