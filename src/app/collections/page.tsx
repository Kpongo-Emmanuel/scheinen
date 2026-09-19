import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary">
            Our Collections
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of fine gemstones and jewelry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map(collection => (
            <Link href={`/shop/${collection.id}`} key={collection.id} className="group block">
              <div className="flex flex-col gap-4">
                <div className="relative overflow-hidden bg-muted aspect-[3/4]">
                  {collection.imageUrl ? (
                    <img 
                      src={collection.imageUrl} 
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted-foreground/5 text-muted-foreground text-xs uppercase tracking-widest">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-end">
                  <h3 className="text-sm font-medium uppercase tracking-widest text-foreground group-hover:text-muted-foreground transition-colors">
                    {collection.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {collection._count.products} Items
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
