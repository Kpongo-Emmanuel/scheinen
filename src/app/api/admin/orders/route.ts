import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId, status } = await request.json();

  if (!orderId || !status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const validStatuses = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "FAILED"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
