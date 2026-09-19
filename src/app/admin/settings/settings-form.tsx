"use client";

import { useState } from "react";
import { updateStoreSettings } from "@/app/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function SettingsForm({ initialSettings }: { initialSettings: any }) {
  const [isLocked, setIsLocked] = useState(initialSettings?.isStoreLocked || false);
  const [message, setMessage] = useState(initialSettings?.lockMessage || "PREPARING FOR NEW DROP.");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateStoreSettings({ isStoreLocked: isLocked, lockMessage: message });
      toast.success("Store settings updated successfully");
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
        <div className="space-y-0.5">
          <Label className="text-base font-semibold">Enable Store Lock</Label>
          <p className="text-sm text-muted-foreground">
            Lock the store to normal customers.
          </p>
        </div>
        <Switch
          checked={isLocked}
          onCheckedChange={setIsLocked}
        />
      </div>

      {isLocked && (
        <div className="space-y-2">
          <Label htmlFor="message">Lock Screen Message</Label>
          <Input 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="e.g., PREPARING FOR NEW DROP."
          />
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}
