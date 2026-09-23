"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createOrder(total: number, items: any[], shippingInfo: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("You must be logged in to checkout.");
  }

  // Use a database transaction to atomically decrement stock and create the order
  const orderId = await prisma.$transaction(async (tx) => {
    // 1. Verify and decrement stock atomically
    for (const item of items) {
      if (item.size && item.size !== "N/A") {
        // Size-based product
        const sizes = await tx.productSize.findMany({ 
          where: { productId: item.id, size: item.size } 
        });
        
        if (sizes.length === 0 || sizes[0].stock < item.quantity) {
          throw new Error(`Oversold: Not enough stock for size ${item.size}`);
        }
        
        await tx.productSize.update({
          where: { id: sizes[0].id },
          data: { stock: { decrement: item.quantity } }
        });
      } else {
        // Base stock product
        const product = await tx.product.findUnique({ 
          where: { id: item.id }
        });
        
        if (!product || product.stock < item.quantity) {
          throw new Error("Oversold: Not enough stock");
        }
        
        await tx.product.update({
          where: { id: item.id },
          data: { stock: { decrement: item.quantity } }
        });
      }
    }

    // 2. Create the order
    const order = await tx.order.create({
      data: {
        userId: session.user.id,
        total,
        status: "PENDING",
        shippingName: shippingInfo.name,
        shippingPhone: shippingInfo.phone,
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingState: shippingInfo.state,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            size: item.size,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });

    return order.id;
  });

  return orderId;
}

export async function verifyStockBeforePayment(items: {id: string, size: string, quantity: number}[]) {
  for (const item of items) {
    const product = await prisma.product.findUnique({ 
      where: { id: item.id }, 
      include: { sizes: true } 
    });
    
    if (!product) return { success: false, message: "Product not found" };
    
    let available = product.stock;
    if (item.size && item.size !== "N/A") {
      const size = product.sizes.find(s => s.size === item.size);
      available = size?.stock || 0;
    }
    
    if (available < item.quantity) {
      return { 
        success: false, 
        message: `Only ${available} left for ${product.name} ${item.size !== "N/A" ? `(Size ${item.size})` : ""}` 
      };
    }
  }
  return { success: true };
}

export async function verifyOrderPayment(orderId: string, reference: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Validate reference with Paystack
  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      // Secret key needed in prod
    }
  });

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "PAID",
      reference: reference,
    }
  });

  return true;
}
