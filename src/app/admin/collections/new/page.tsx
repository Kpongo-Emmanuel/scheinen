"use client";

import { createCollection } from "@/app/actions/collection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewCollectionPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await createCollection(formData);
      toast.success("Collection created successfully!");
    } catch (error) {
      toast.error("Failed to create collection");
    }
  };

  return (
    <div className="max-w-2xl pb-20">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Add New Collection</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border border-border">
        
        <div>
          <Label htmlFor="name">Collection Name</Label>
          <Input id="name" name="name" required className="mt-1" placeholder="e.g. Vintage Rings" />
        </div>

        <div>
          <Label htmlFor="image">Collection Banner / Image</Label>
          <Input id="image" name="image" type="file" accept="image/*" className="mt-1" />
          <p className="text-xs text-muted-foreground mt-1">
            Note: Images are saved locally for now.
          </p>
        </div>

        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea id="description" name="description" className="mt-1" rows={4} placeholder="Describe this collection..." />
        </div>

        <Button type="submit" className="w-full h-12 text-lg mt-4">
          Create Collection
        </Button>
      </form>
    </div>
  );
}
