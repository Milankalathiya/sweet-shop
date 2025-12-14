import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, checkout, clearCart } = useCart();
  const [, setLocation] = useLocation();

  const handleCheckout = async () => {
    try {
      await checkout();
      setLocation('/orders');
    } catch (error) {
      // Error already handled in checkout function with toast
      console.error('Checkout error:', error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold font-display">Your Cart is Empty</h2>
        <p className="text-muted-foreground">Looks like you haven't added any sweets yet.</p>
        <Button size="lg" asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/shop">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-display">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card/50 rounded-xl p-6 shadow-sm border space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 sm:gap-6">
                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">{item.category}</p>
                    </div>
                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-background rounded-lg border p-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4 mr-2" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={clearCart} className="text-destructive hover:text-destructive">
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl p-6 shadow-md border sticky top-24">
            <h3 className="font-bold text-xl mb-4 font-display">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (Mock 8%)</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-bold text-xl mb-6">
              <span>Total</span>
              <span>${(total * 1.08).toFixed(2)}</span>
            </div>
            <Button className="w-full text-lg py-6 shadow-lg shadow-primary/20 hover:shadow-primary/40" onClick={handleCheckout}>
              Checkout
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Secure checkout powered by sugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
