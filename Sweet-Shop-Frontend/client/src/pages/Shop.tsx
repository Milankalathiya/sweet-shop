import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { SweetCard } from "@/components/sweets/SweetCard";
import { FilterBar } from "@/components/sweets/FilterBar";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: sweets, isLoading } = useQuery({
    queryKey: ['sweets'],
    queryFn: () => api.getSweets(),
    refetchInterval: 10000, // Poll every 10s as requested
  });

  const categories = useMemo(() => {
    if (!sweets) return [];
    return Array.from(new Set(sweets.map(s => s.category)));
  }, [sweets]);

  const filteredSweets = useMemo(() => {
    if (!sweets) return [];
    return sweets.filter(sweet => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || sweet.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [sweets, searchQuery, categoryFilter]);

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <div className="relative -mx-4 px-4 py-24 bg-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        <div className="relative container mx-auto text-center space-y-6">
          <h1 className="font-display text-6xl md:text-7xl font-bold text-primary tracking-tight drop-shadow-sm">
            Sweet Dreams
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Handcrafted confections that spark joy. From artisanal chocolates to nostalgic gummies, find your perfect treat.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-20 z-20 bg-background/80 backdrop-blur-xl py-6 border-b shadow-sm -mx-4 px-4">
        <div className="container mx-auto">
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={categories}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Loading sweetness...</p>
          </div>
        ) : filteredSweets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSweets.map((sweet, index) => (
              <div
                key={sweet.id}
                className="h-full transform hover:-translate-y-2 transition-all duration-500 hover:shadow-xl rounded-xl"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <SweetCard sweet={sweet} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 text-muted-foreground bg-muted/30 rounded-3xl border-2 border-dashed border-primary/20">
            <div className="bg-background p-4 rounded-full mb-4 shadow-sm">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl font-display font-bold text-foreground">No sweets found</p>
            <p className="text-lg mt-2">Try adjusting your search or filters to find what you're craving.</p>
            <Button
              variant="link"
              onClick={() => { setSearchQuery(""); setCategoryFilter("all"); }}
              className="mt-4 text-primary"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
