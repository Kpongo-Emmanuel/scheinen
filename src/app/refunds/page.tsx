export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Return &amp; Refund Policy</h1>
        <p className="text-muted-foreground text-sm mb-12">Last updated: September 2024</p>

        <h2 className="text-xl font-semibold mt-10 mb-4">All Sales Are Final</h2>
        <p>
          At SCHEINEN CO, all sales are final. We do <strong>not</strong> accept returns, exchanges, or issue refunds on any purchases. We encourage you to carefully review product details, sizing, and images before placing your order.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">Damaged or Defective Items</h2>
        <p>
          If you receive an item that is damaged or defective upon delivery, please contact us at <a href="mailto:Scheinen.co@gmail.com" className="underline">Scheinen.co@gmail.com</a> within <strong>24 hours</strong> of receiving your order. Please include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Your order number</li>
          <li>A clear description of the issue</li>
          <li>Photographs showing the damage or defect</li>
        </ul>
        <p>
          We will review your case and, at our sole discretion, may offer a replacement or store credit.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">Wrong Item Received</h2>
        <p>
          If you receive an incorrect item, please contact us within <strong>24 hours</strong> of delivery. We will arrange for the correct item to be sent to you at no additional cost.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">Contact Us</h2>
        <p>
          For any concerns regarding your order, reach us at:<br />
          <strong>SCHEINEN CO</strong><br />
          Email: <a href="mailto:Scheinen.co@gmail.com" className="underline">Scheinen.co@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
