"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function createCollection(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;
  let imageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uniqueId = crypto.randomBytes(8).toString("hex");
    const extension = path.extname(imageFile.name) || ".jpg";
    const filename = `col_${uniqueId}${extension}`;
    
    const { supabaseAdmin } = await import("@/lib/supabase");
    
    const { data, error } = await supabaseAdmin.storage
      .from("scheinen-images")
      .upload(`collections/${filename}`, buffer, {
        contentType: imageFile.type || 'image/jpeg',
        upsert: false
      });
      
    if (error) {
      console.error("Supabase upload error:", error);
      throw new Error("Failed to upload image");
    }
    
    const { data: publicUrlData } = supabaseAdmin.storage
      .from("scheinen-images")
      .getPublicUrl(`collections/${filename}`);
      
    imageUrl = publicUrlData.publicUrl;
  }

  await prisma.collection.create({
    data: {
      name,
      description,
      imageUrl: imageUrl || null,
    },
  });

  revalidatePath("/admin/collections");
  revalidatePath("/collections");
  revalidatePath("/");
  redirect("/admin/collections");
}

export async function deleteCollection(id: string) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.collection.delete({
    where: { id },
  });

  revalidatePath("/admin/collections");
  revalidatePath("/collections");
  revalidatePath("/");
}

export async function updateCollectionStatus(id: string, status: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");
  await prisma.collection.update({ where: { id }, data: { status } });
  revalidatePath("/admin/collections");
  revalidatePath("/collections");
  revalidatePath("/");
}
