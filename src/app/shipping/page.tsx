export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Shipping Policy</h1>
        <p className="text-muted-foreground text-sm mb-12">Last updated: September 2024</p>

        <h2 className="text-xl font-semibold mt-10 mb-4">1. Shipping Coverage</h2>
        <p>
          We currently ship <strong>nationwide within Nigeria only</strong>. International shipping is not available at this time.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">2. Processing Time</h2>
        <p>
          Orders are processed within <strong>1–3 business days</strong> after payment confirmation. You will receive a notification once your order has been dispatched.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">3. Delivery Time</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Lagos:</strong> 1–3 business days</li>
          <li><strong>Other major cities (Abuja, Port Harcourt, etc.):</strong> 3–5 business days</li>
          <li><strong>Other locations:</strong> 5–7 business days</li>
        </ul>
        <p className="text-muted-foreground text-sm mt-2">
          Delivery times are estimates and may vary due to factors beyond our control such as public holidays, weather, or logistics delays.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">4. Shipping Costs</h2>
        <p>
          Shipping fees are calculated at checkout based on your delivery location. Free shipping may be available for select promotions.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">5. Order Tracking</h2>
        <p>
          Once your order is shipped, you will receive tracking information via email. If you have any questions about your shipment, please contact us.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">6. Failed Deliveries</h2>
        <p>
          If a delivery attempt fails due to an incorrect address or the recipient being unavailable, additional delivery charges may apply. Please ensure your shipping details are accurate at the time of checkout.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">7. Damaged Items</h2>
        <p>
          If your order arrives damaged, please contact us at <a href="mailto:Scheinen.co@gmail.com" className="underline">Scheinen.co@gmail.com</a> within <strong>24 hours</strong> of delivery with photographic evidence. We will work with you to resolve the issue.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">8. Contact Us</h2>
        <p>
          For shipping enquiries, reach us at:<br />
          <strong>SCHEINEN CO</strong><br />
          Email: <a href="mailto:Scheinen.co@gmail.com" className="underline">Scheinen.co@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
