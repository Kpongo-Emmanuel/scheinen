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
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/20">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-card border-b md:border-b-0 md:border-r border-border p-4 md:p-6 flex flex-col md:h-screen sticky top-0 gap-4 md:gap-6 z-10">
        <div className="font-bold text-xl text-foreground hidden md:block">
          Scheinen Admin
        </div>
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
          <Button variant="ghost" className="justify-start w-auto md:w-full whitespace-nowrap" asChild>
            <Link href="/admin">Dashboard</Link>
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground w-auto md:w-full whitespace-nowrap" asChild>
            <Link href="/admin/collections">Collections</Link>
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground w-auto md:w-full whitespace-nowrap" asChild>
            <Link href="/admin/products">Products</Link>
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground w-auto md:w-full whitespace-nowrap" asChild>
            <Link href="/admin/orders">Orders</Link>
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground w-auto md:w-full whitespace-nowrap" asChild>
            <Link href="/admin/settings">Settings</Link>
          </Button>
          <Button variant="ghost" className="justify-start w-auto md:w-full whitespace-nowrap" asChild>
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
