import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/actions/product";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { collection: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Link>
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[800px]">
          <thead className="bg-muted text-muted-foreground uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Collection</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-accent/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-muted overflow-hidden">
                    {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />}
                  </div>
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="px-6 py-4">{product.collection.name}</td>
                <td className="px-6 py-4">₦{product.price.toLocaleString()}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 text-right">
                  <form action={async () => {
                    "use server";
                    await deleteProduct(product.id);
                  }}>
                    <Button variant="ghost" size="sm" type="submit" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No products found. Add some!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
