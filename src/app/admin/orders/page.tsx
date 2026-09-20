import { prisma } from "@/lib/prisma";
import { OrderStatusSelect } from "./order-status-select";
import { Package, Mail, Phone, MapPin } from "lucide-react";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground">{orders.length} total orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Order header */}
              <div className="p-4 md:p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-muted-foreground">#{order.id.slice(-8).toUpperCase()}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-NG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-lg font-bold">₦{order.total.toLocaleString()}</p>
                </div>
                <OrderStatusSelect id={order.id} currentStatus={order.status} />
              </div>

              {/* Customer + Shipping */}
              <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-border/50 bg-muted/30">
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer</h4>
                  <p className="text-sm font-medium">{order.user.name || "—"}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <a href={`mailto:${order.user.email}`} className="hover:text-foreground underline break-all">
                      {order.user.email}
                    </a>
                  </div>
                  {order.shippingPhone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <a href={`tel:${order.shippingPhone}`} className="hover:text-foreground underline">
                        {order.shippingPhone}
                      </a>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shipping</h4>
                  {order.shippingAddress ? (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <div>
                        <p>{order.shippingName}</p>
                        <p>{order.shippingAddress}</p>
                        <p>{[order.shippingCity, order.shippingState].filter(Boolean).join(", ")}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No shipping info provided</p>
                  )}
                </div>
              </div>

              {/* Order items */}
              <div className="p-4 md:p-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Items</h4>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-muted overflow-hidden shrink-0">
                        {item.product.imageUrl && (
                          <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size} · Qty: {item.quantity} · ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paystack reference */}
              {order.reference && (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <p className="text-xs text-muted-foreground">
                    Paystack Ref: <span className="font-mono">{order.reference}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
