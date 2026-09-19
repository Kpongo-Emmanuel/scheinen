import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  if (!q) {
    redirect("/shop");
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q } },
        { description: { contains: q } },
        { collection: { name: { contains: q } } }
      ]
    },
    include: {
      collection: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-wide uppercase mb-2">
            Search Results
          </h1>
          <p className="text-muted-foreground">
            {products.length} {products.length === 1 ? 'result' : 'results'} for "{q}"
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-muted-foreground py-20 border-t border-border">
            No products found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
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
                    <div className="absolute top-4 left-4 bg-background/90 text-[10px] uppercase tracking-wider px-2 py-1 font-medium">
                      {product.collection.name}
                    </div>
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
