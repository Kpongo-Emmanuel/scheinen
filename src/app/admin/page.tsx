export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">$45,231.89</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">+150</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Products in Stock</h3>
          <p className="text-3xl font-bold mt-2">1,204</p>
        </div>
      </div>
    </div>
  );
}
