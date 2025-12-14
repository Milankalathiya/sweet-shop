import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { cart, removeFromCart, updateQuantity, total, checkout } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleCheckout = async () => {
    setIsOpen(false);
    setLocation('/cart'); // Redirect to full cart page or just handle here? 
    // Spec says "Checkout (batch purchase)"
    // For now, let's just use the checkout function directly here for simplicity if user wants quick checkout
    // Or we can redirect to a dedicated page. Let's keep it simple and checkout here for now or redirect.
    // Actually spec mentions "Cart system: Modal/cart page... checkout". 
    // I'll put a "Go to Cart" button.
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Your Sweet Stash</SheetTitle>
          <SheetDescription>
            {cart.length === 0 ? "Your cart is empty. Time to fill it up!" : `You have ${cart.length} items in your cart.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 mt-8 overflow-hidden">
          {cart.length > 0 ? (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-muted-foreground text-xs">${item.price.toFixed(2)} / each</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
              <ShoppingBag className="h-16 w-16 opacity-20" />
              <p>No sweets yet...</p>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="mt-auto border-t pt-4 sm:justify-center flex-col gap-4">
            <div className="flex items-center justify-between w-full mb-4">
              <span className="font-medium text-muted-foreground">Total</span>
              <span className="font-bold text-2xl text-primary-dark">${total.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" onClick={() => { setIsOpen(false); setLocation('/cart'); }}>
                View Cart
              </Button>
              <Button onClick={() => { setIsOpen(false); setLocation('/cart'); }}>
                Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

import { ShoppingBag } from "lucide-react";
