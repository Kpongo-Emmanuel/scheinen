import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, Plus } from "lucide-react";
import { deleteCollection } from "@/app/actions/collection";

export default async function AdminCollectionsPage() {
  const collections = await prisma.collection.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Collections</h1>
        <Button asChild>
          <Link href="/admin/collections/new">
            <Plus className="mr-2 h-4 w-4" /> Add Collection
          </Link>
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-4 font-semibold">Image</th>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Products</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {collections.map((col) => (
              <tr key={col.id} className="hover:bg-accent/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-12 h-12 rounded bg-muted overflow-hidden">
                    {col.imageUrl ? (
                      <img src={col.imageUrl} alt={col.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full text-xs text-muted-foreground">N/A</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-foreground">{col.name}</td>
                <td className="px-6 py-4">{col._count.products} products</td>
                <td className="px-6 py-4 text-right">
                  <form action={async () => {
                    "use server";
                    await deleteCollection(col.id);
                  }}>
                    <Button variant="ghost" size="icon" type="submit" className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
            {collections.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  No collections found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
