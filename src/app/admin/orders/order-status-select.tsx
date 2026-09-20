"use client";

import { useState } from "react";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export function OrderStatusSelect({ 
  id, 
  currentStatus 
}: { 
  id: string; 
  currentStatus: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (value: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: id, status: value }),
      });
      if (!res.ok) throw new Error();
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Select defaultValue={currentStatus} onValueChange={handleStatusChange} disabled={isLoading}>
      <SelectTrigger className="w-[140px] h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">PENDING</SelectItem>
        <SelectItem value="PAID">PAID</SelectItem>
        <SelectItem value="SHIPPED">SHIPPED</SelectItem>
        <SelectItem value="DELIVERED">DELIVERED</SelectItem>
        <SelectItem value="FAILED">FAILED</SelectItem>
      </SelectContent>
    </Select>
  );
}
