import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  // Get total revenue
  const revenueAggregation = await prisma.order.aggregate({
    _sum: {
      total: true
    },
    where: {
      status: "PAID"
    }
  });
  const totalRevenue = revenueAggregation._sum.total || 0;

  // Get total paid orders
  const totalOrders = await prisma.order.count({
    where: {
      status: "PAID"
    }
  });

  // Get total products in stock
  const stockAggregation = await prisma.product.aggregate({
    _sum: {
      stock: true
    }
  });
  
  // Wait, stock is also tracked in ProductSize!
  const sizeStockAggregation = await prisma.productSize.aggregate({
    _sum: {
      stock: true
    }
  });

  const totalStock = (stockAggregation._sum.stock || 0) + (sizeStockAggregation._sum.stock || 0);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">₦{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{totalOrders}</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Products in Stock</h3>
          <p className="text-3xl font-bold mt-2">{totalStock}</p>
        </div>
      </div>
    </div>
  );
}
