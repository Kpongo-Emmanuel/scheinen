import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getStoreLockStatus() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "singleton" }
  });
  
  const session = await getServerSession(authOptions);

  if (settings?.isStoreLocked && session?.user?.role !== "ADMIN") {
    return { 
      locked: true, 
      message: settings.lockMessage || "PREPARING FOR NEW DROP." 
    };
  }
  
  return { locked: false };
}
