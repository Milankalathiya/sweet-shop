import { useState } from 'react';
import { Sweet } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

// Default fallback image URL
const FALLBACK_IMAGE = 'https://i.imgur.com/8kQ9X9d.jpg';

interface SweetCardProps {
  sweet: Sweet;
}

export function SweetCard({ sweet }: SweetCardProps) {
  const { addToCart } = useCart();

  const isOutOfStock = sweet.stock === 0;

  const [imgSrc, setImgSrc] = useState(sweet.imageUrl);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (!imgError) {
      setImgSrc(FALLBACK_IMAGE);
      setImgError(true);
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-none bg-card/50 backdrop-blur-sm">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imgError ? FALLBACK_IMAGE : sweet.imageUrl}
          alt={sweet.name}
          onError={handleImageError}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="font-bold text-destructive text-lg transform -rotate-12 border-4 border-destructive px-4 py-2 rounded-xl">SOLD OUT</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90 text-foreground backdrop-blur shadow-sm">
            {sweet.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="font-display text-lg leading-tight group-hover:text-primary transition-colors">
            {sweet.name}
          </CardTitle>
          <span className="font-bold text-lg text-primary-foreground bg-primary/20 px-2 py-1 rounded-md text-primary-dark whitespace-nowrap">
            ${sweet.price.toFixed(2)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {sweet.description}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {sweet.stock > 0 ? `${sweet.stock} in stock` : 'Out of stock'}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          disabled={isOutOfStock}
          onClick={() => addToCart(sweet)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
