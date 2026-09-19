import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CollectionPage({ params }: { params: Promise<{ collectionId: string }> }) {
  const { collectionId } = await params;
  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
    include: {
      products: true
    }
  });

  if (!collection) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {collection.description}
            </p>
          )}
        </div>

        {/* Product Grid */}
        {collection.products.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No products in this collection yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {collection.products.map(product => (
              <Link href={`/product/${product.id}`} key={product.id} className="group cursor-pointer block">
                <div className="flex flex-col gap-3">
                  <div className="aspect-[4/5] relative bg-muted overflow-hidden">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest">
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wide group-hover:text-muted-foreground transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      ₦{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
