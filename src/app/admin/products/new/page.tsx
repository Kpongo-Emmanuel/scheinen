"use client";

import { createProduct } from "@/app/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function NewProductPage() {
  const [collections, setCollections] = useState<{id: string, name: string}[]>([]);
  const [sizes, setSizes] = useState<{size: string, stock: number}[]>([]);

  // Fetch collections purely for the dropdown
  useEffect(() => {
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => setCollections(data))
      .catch(() => {});
  }, []);

  const addSize = () => setSizes([...sizes, { size: "", stock: 0 }]);
  const removeSize = (index: number) => setSizes(sizes.filter((_, i) => i !== index));

  const updateSize = (index: number, field: "size" | "stock", value: string) => {
    const newSizes = [...sizes];
    if (field === "size") {
      newSizes[index].size = value;
    } else {
      newSizes[index].stock = parseInt(value, 10) || 0;
    }
    setSizes(newSizes);
  };

  const submitAction = async (formData: FormData) => {
    formData.append("sizes", JSON.stringify(sizes));

    try {
      const res = await createProduct(formData);
      if (res?.error) {
        toast.error(res.error);
      } else if (res?.success) {
        toast.success("Product created!");
        window.location.href = "/admin/products"; // manual redirect
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="max-w-2xl pb-20">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Add New Product</h1>
      
      <form action={submitAction} className="space-y-6 bg-card p-6 rounded-xl border border-border">
        
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" required className="mt-1" />
        </div>

        <div>
          <Label htmlFor="collectionId">Collection</Label>
          <select 
            id="collectionId" 
            name="collectionId" 
            required 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
          >
            <option value="">Select a collection</option>
            {collections.map(col => (
              <option key={col.id} value={col.id}>{col.name}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="price">Price (₦ Naira)</Label>
          <Input id="price" name="price" type="number" step="0.01" required className="mt-1" />
        </div>

        <div>
          <Label htmlFor="stock">Base Stock (Overall or No-size items)</Label>
          <Input id="stock" name="stock" type="number" required className="mt-1" defaultValue="0" />
        </div>

        {/* Dynamic Sizes Section */}
        <div className="border-t border-border pt-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Label>Ring / Item Sizes</Label>
              <p className="text-xs text-muted-foreground mt-1">Add specific sizes and their individual inventory counts.</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addSize}>
              <Plus className="w-4 h-4 mr-2" /> Add Size
            </Button>
          </div>
          
          <div className="space-y-3">
            {sizes.map((s, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label className="text-xs">Size (e.g. 6, 7, O, P)</Label>
                  <Input 
                    value={s.size}
                    onChange={(e) => updateSize(index, "size", e.target.value)}
                    required 
                    className="mt-1" 
                    placeholder="Size"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs">Stock Available</Label>
                  <Input 
                    type="number"
                    value={s.stock}
                    onChange={(e) => updateSize(index, "stock", e.target.value)}
                    required 
                    className="mt-1" 
                  />
                </div>
                <Button type="button" variant="ghost" size="icon" className="text-destructive mb-0.5" onClick={() => removeSize(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {sizes.length === 0 && (
              <div className="text-sm text-muted-foreground italic bg-muted p-3 rounded-md text-center">
                No specific sizes added. This product will use the base stock above.
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-6 mt-6">
          <Label htmlFor="image">Product Image</Label>
          <Input id="image" name="image" type="file" accept="image/*" className="mt-1" />
          <p className="text-xs text-muted-foreground mt-1">
            Note: Images are saved locally for now.
          </p>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required className="mt-1" rows={4} />
        </div>

        <Button type="submit" className="w-full h-12 text-lg mt-4">
          Create Product
        </Button>
      </form>
    </div>
  );
}
