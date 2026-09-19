"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/store/useCart";
import { ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AddToCartProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    sizes: { size: string; stock: number }[];
    baseStock: number;
  };
}

export function AddToCartButton({ product }: AddToCartProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const addItem = useCart((state) => state.addItem);
  
  const hasSizes = product.sizes && product.sizes.length > 0;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  // Calculate available stock based on selection
  const currentStock = hasSizes 
    ? (selectedSize ? product.sizes.find(s => s.size === selectedSize)?.stock || 0 : 0)
    : product.baseStock;

  const isOutOfStock = hasSizes ? (selectedSize && currentStock === 0) : (currentStock === 0);

  const handleAdd = () => {
    if (!session) {
      toast.error("Please log in to add items to your cart.");
      router.push("/login");
      return;
    }

    if (hasSizes && !selectedSize) {
      toast.error("Please select a size first.");
      return;
    }

    if (currentStock === 0) {
      toast.error("This item is out of stock.");
      return;
    }

    const cartId = hasSizes ? `${product.id}-${selectedSize}` : product.id;

    addItem({
      id: cartId,
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      selectedSize: selectedSize || undefined,
    });
    
    setIsAdded(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {hasSizes && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Select Size</span>
            {selectedSize && (
              <span className={cn("text-xs font-medium", currentStock > 0 ? "text-green-600" : "text-destructive")}>
                {currentStock > 0 ? `${currentStock} in stock` : "Out of stock"}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const outOfStock = s.stock === 0;
              return (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  disabled={outOfStock}
                  className={cn(
                    "h-12 min-w-14 px-4 rounded-md border text-sm font-medium transition-all",
                    selectedSize === s.size 
                      ? "border-primary bg-primary text-primary-foreground" 
                      : "border-border bg-background hover:bg-accent",
                    outOfStock && "opacity-50 cursor-not-allowed decoration-destructive line-through"
                  )}
                >
                  {s.size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!hasSizes && (
        <div>
          {currentStock > 0 ? (
            <p className="text-sm text-green-600 font-medium">{currentStock} in stock and ready to ship</p>
          ) : (
            <p className="text-sm text-destructive font-medium">Out of Stock</p>
          )}
        </div>
      )}

      <Button 
        onClick={handleAdd}
        disabled={isOutOfStock || (hasSizes && !selectedSize)}
        size="lg"
        className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
      >
        <ShoppingBasket className="mr-2 h-5 w-5" />
        {isAdded ? "Added to Cart!" : (isOutOfStock ? "Out of Stock" : "Add to Cart")}
      </Button>
    </div>
  );
}
