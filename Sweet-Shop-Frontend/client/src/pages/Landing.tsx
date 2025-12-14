import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Lock } from "lucide-react";
import { SweetCard } from "@/components/sweets/SweetCard";
import { MOCK_SWEETS } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";

export default function Landing() {
  const { user } = useAuth();
  const featuredSweets = MOCK_SWEETS.slice(0, 3);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-primary/20 min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
        
        <div className="container relative z-10 px-6 md:px-12 flex flex-col gap-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-dark w-fit animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-bold">Premium Handcrafted Sweets</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-foreground animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Life is Short, <br/>
            <span className="text-primary-dark">Make it Sweet.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Discover our artisanal collection of chocolates, gummies, and pastries. 
            Made with love and the finest ingredients for your daily dose of happiness.
          </p>
          
          <div className="flex gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            {user ? (
              <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-105" asChild>
                <Link href="/shop">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-105" asChild>
                  <Link href="/login">
                    Login to Shop <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6 bg-background/50 backdrop-blur border-2 hover:bg-background/80" asChild>
                  <Link href="/register">
                    Register
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Section - Protected */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-bold">Featured Treats</h2>
          {user && (
            <Button variant="link" className="text-primary-dark" asChild>
              <Link href="/shop">View all</Link>
            </Button>
          )}
        </div>
        
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSweets.map(sweet => (
              <div key={sweet.id} className="h-[400px]">
                <SweetCard sweet={sweet} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-muted p-12 flex flex-col items-center justify-center text-center bg-card/50">
            <div className="bg-muted p-4 rounded-full mb-4">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Members Only Content</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Our exclusive collection of sweets is reserved for our members. 
              Please login or create an account to view our delicious offerings.
            </p>
            <Button asChild>
              <Link href="/login">Login to View Products</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12 bg-secondary/10 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-3xl">🍬</div>
            <h3 className="font-display text-xl font-bold mb-2">Artisanal Quality</h3>
            <p className="text-muted-foreground">Hand-crafted in small batches to ensure the perfect taste every time.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-3xl">🚚</div>
            <h3 className="font-display text-xl font-bold mb-2">Express Delivery</h3>
            <p className="text-muted-foreground">Fresh sweets delivered right to your doorstep within 24 hours.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-3xl">💝</div>
            <h3 className="font-display text-xl font-bold mb-2">Gift Wrapped</h3>
            <p className="text-muted-foreground">Perfect for special occasions. We wrap every box with care.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
