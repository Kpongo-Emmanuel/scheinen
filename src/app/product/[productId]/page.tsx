import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AddToCartButton } from "./add-to-cart-button";

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      collection: true,
      sizes: true
    }
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto mb-8">
        <Link href={`/shop/${product.collectionId}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
          ← Back to {product.collection.name}
        </Link>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Image Column */}
        <div className="aspect-square bg-muted rounded-3xl overflow-hidden border border-border">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image Available
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="flex flex-col justify-center">
          <div className="text-sm text-primary font-medium mb-2 uppercase tracking-wider">
            {product.collection.name}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-medium text-muted-foreground mb-8">
            ₦{product.price.toLocaleString()}
          </p>
          
          <div className="prose prose-sm md:prose-base dark:prose-invert mb-10">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                sizes: product.sizes.map(s => ({ size: s.size, stock: s.stock })),
                baseStock: product.stock
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
