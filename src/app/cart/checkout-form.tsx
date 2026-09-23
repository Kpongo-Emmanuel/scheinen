"use client";

import React, { useState, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/store/useCart";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder, verifyOrderPayment, verifyStockBeforePayment } from "@/app/actions/order";


const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

export default function CheckoutForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mounted, setMounted] = useState(false);
  
  const { items, cartTotal, removeItem } = useCart();
  
  useEffect(() => {
    setMounted(true);
    if (session?.user) {
      if (session.user.email) setEmail(session.user.email);
      if (session.user.name) setName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("You must be logged in to view your cart.");
      router.push("/login");
    }
  }, [status, router]);

  const totalAmount = cartTotal();
  const paystackAmount = totalAmount * 100; 

  const config = {
    reference: (new Date()).getTime().toString(),
    email,
    amount: paystackAmount, 
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: 'NGN',
  };

  const onSuccess = async (reference: any) => {
    try {
      // 1. Create order in DB with items
      const realProductItems = items.map(i => ({
        id: i.id.split('-')[0], // Extract real productId if id is composite
        size: i.selectedSize || "N/A",
        quantity: i.quantity,
        price: i.price
      }));

      const shippingInfo = {
        name,
        phone,
        address,
        city,
        state,
      };

      const orderId = await createOrder(totalAmount, realProductItems, shippingInfo);
      
      // 2. Verify and Mark Paid
      await verifyOrderPayment(orderId, reference.reference);
      
      toast.success("Payment successful! Reference: " + reference.reference);
      useCart.getState().clearCart();
      router.push("/");
    } catch (e) {
      console.error(e);
      toast.error("Payment processed, but order recording failed. Contact support.");
    }
  };

  const onClose = () => {
    toast.info("Payment window closed.");
  };

  const initializePayment = usePaystackPayment(config);

  if (!mounted || status === "loading" || status === "unauthenticated") return null;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button asChild>
          <Link href="/">Return to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Left Col: Order Summary */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm h-fit">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : null}
                </div>
                <div>
                  <h3 className="font-medium line-clamp-1">{item.name}</h3>
                  {item.selectedSize && (
                    <p className="text-xs text-muted-foreground mt-0.5">Size: {item.selectedSize}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          <Separator />
          
          <div className="flex justify-between items-center font-bold text-xl">
            <p>Total</p>
            <p>₦{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Right Col: Payment Details */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm h-fit">
        <h2 className="text-xl font-semibold mb-6">Shipping &amp; Payment Details</h2>
        <form className="space-y-6" onSubmit={async (e) => {
          e.preventDefault();
          if(!email || !name || !address || !city || !state || !phone) {
            toast.error("Please fill all required fields");
            return;
          }
          
          // Verify stock before launching Paystack
          const realProductItems = items.map(i => ({
            id: i.id.split('-')[0], 
            size: i.selectedSize || "N/A",
            quantity: i.quantity,
          }));
          
          toast.loading("Verifying stock...", { id: "stock-check" });
          const stockCheck = await verifyStockBeforePayment(realProductItems);
          
          if (!stockCheck.success) {
            toast.dismiss("stock-check");
            toast.error(stockCheck.message || "An item is out of stock.");
            return;
          }
          
          toast.dismiss("stock-check");
          
          // @ts-ignore
          initializePayment(onSuccess, onClose);
        }}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              placeholder="Jane Doe"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
              placeholder="+234 800 000 0000"
            />
          </div>

          <div>
            <Label htmlFor="address">Delivery Address</Label>
            <Input
              id="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1"
              placeholder="123 Example Street, Area 1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1"
                placeholder="Abuja"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1"
                placeholder="FCT"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-14 text-lg mt-6 shadow-lg">
            Pay ₦{totalAmount.toLocaleString()}
          </Button>
        </form>
      </div>

    </div>
  );
}
