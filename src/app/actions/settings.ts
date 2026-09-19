"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateStoreSettings(data: { isStoreLocked: boolean; lockMessage: string }) {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.storeSettings.upsert({
    where: { id: "singleton" },
    update: {
      isStoreLocked: data.isStoreLocked,
      lockMessage: data.lockMessage,
    },
    create: {
      id: "singleton",
      isStoreLocked: data.isStoreLocked,
      lockMessage: data.lockMessage,
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
  
  return { success: true };
}
