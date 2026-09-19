"use client";

import { useState } from "react";
import { updateCollectionStatus } from "@/app/actions/collection";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export function CollectionStatusSelect({ 
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
      await updateCollectionStatus(id, value);
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Select defaultValue={currentStatus} onValueChange={handleStatusChange} disabled={isLoading}>
      <SelectTrigger className="w-[130px] h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
        <SelectItem value="LOCKED">LOCKED (Hype)</SelectItem>
        <SelectItem value="DRAFT">DRAFT (Hidden)</SelectItem>
      </SelectContent>
    </Select>
  );
}
