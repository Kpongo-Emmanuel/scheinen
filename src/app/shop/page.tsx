import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getStoreLockStatus } from "@/lib/store-lock";
import { LockScreen } from "@/components/layout/lock-screen";

export default async function ShopAllPage() {
  const { locked, message } = await getStoreLockStatus();
  if (locked) return <LockScreen message={message} />;

  const products = await prisma.product.findMany({
    include: {
      collection: true,
      sizes: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary">
            Shop All
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our entire catalog of fine jewelry.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No products available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => {
              const totalStock = product.sizes.length > 0 
                ? product.sizes.reduce((sum, s) => sum + s.stock, 0)
                : product.stock;
              const isSoldOut = totalStock === 0;

              return (
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
                      {/* Minimalist Badge */}
                      <div className="absolute top-4 left-4 bg-background/90 text-[10px] uppercase tracking-wider px-2 py-1 font-medium">
                        {product.collection.name}
                      </div>
                      {isSoldOut && (
                        <div className="absolute top-4 right-4 bg-background/90 text-destructive text-[10px] uppercase tracking-wider px-2 py-1 font-medium">
                          Sold Out
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
