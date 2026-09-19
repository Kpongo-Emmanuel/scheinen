import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6 flex flex-col gap-6">
        <div className="font-bold text-xl text-foreground">
          Scheinen Admin
        </div>
        <nav className="flex flex-col gap-2">
          <Button variant="ghost" className="justify-start w-full" asChild>
            <Link href="/admin">Dashboard</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" asChild>
            <Link href="/admin/collections">Collections</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" asChild>
            <Link href="/admin/products">Products</Link>
          </Button>
          <Button variant="ghost" className="justify-start w-full" asChild>
            <Link href="/">Back to Store</Link>
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
