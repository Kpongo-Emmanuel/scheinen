"use client";

import dynamic from "next/dynamic";

// The Paystack hook uses `window` object which fails during Next.js SSR build.
// Dynamically importing the component with ssr: false fixes this!
const CheckoutForm = dynamic(() => import("./checkout-form"), { ssr: false });

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <CheckoutForm />
    </div>
  );
}
