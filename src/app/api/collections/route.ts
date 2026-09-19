import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      select: { id: true, name: true }
    });
    return NextResponse.json(collections);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}
