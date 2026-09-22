"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function createProduct(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Guard
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10);
  const collectionId = formData.get("collectionId") as string;
  
  const imageFile = formData.get("image") as File | null;
  let imageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate a unique filename
    const uniqueId = crypto.randomBytes(8).toString("hex");
    const extension = path.extname(imageFile.name) || ".jpg";
    const filename = `${uniqueId}${extension}`;
    
    const { supabaseAdmin } = await import("@/lib/supabase");
    
    const { data, error } = await supabaseAdmin.storage
      .from("scheinen-images")
      .upload(`products/${filename}`, buffer, {
        contentType: imageFile.type || 'image/jpeg',
        upsert: false
      });
      
    if (error) {
      console.error("Supabase upload error:", error);
      throw new Error(`Failed to upload image. Make sure the 'scheinen-images' bucket is created and public in Supabase. Error: ${error.message}`);
    }
    
    const { data: publicUrlData } = supabaseAdmin.storage
      .from("scheinen-images")
      .getPublicUrl(`products/${filename}`);
      
    // The public URL
    imageUrl = publicUrlData.publicUrl;
  }

  const sizesJson = formData.get("sizes") as string;
  let sizesData: { size: string, stock: number }[] = [];
  try {
    if (sizesJson) {
      sizesData = JSON.parse(sizesJson);
    }
  } catch (e) {
    console.error("Failed to parse sizes", e);
  }

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      collectionId,
      imageUrl: imageUrl || null,
      sizes: {
        create: sizesData.map(s => ({
          size: s.size,
          stock: s.stock
        }))
      }
    },
  });

  revalidatePath("/admin/products");
  revalidatePath(`/shop/${collectionId}`);
  redirect("/admin/products");
}

export async function deleteProduct(productId: string) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.product.delete({
    where: { id: productId },
  });

  revalidatePath("/admin/products");
}
