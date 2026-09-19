export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Terms &amp; Conditions</h1>
        <p className="text-muted-foreground text-sm mb-12">Last updated: September 2024</p>

        <p>
          Welcome to Scheinen. These Terms &amp; Conditions govern your use of the Scheinen website and your purchase of products from SCHEINEN CO. By accessing our website or placing an order, you agree to be bound by these terms.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">1. General</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>These terms apply to all users of the website, including browsers, customers, and merchants.</li>
          <li>We reserve the right to update or modify these terms at any time without prior notice.</li>
          <li>By continuing to use the website after changes are posted, you accept the revised terms.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">2. Account</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>You must sign in using your Google account to make a purchase.</li>
          <li>You are responsible for maintaining the security of your account.</li>
          <li>You must provide accurate and complete information.</li>
          <li>You must be at least 18 years old, or have the consent of a parent or legal guardian.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">3. Products &amp; Pricing</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>All prices are listed in Nigerian Naira (₦) and are inclusive of applicable taxes.</li>
          <li>We reserve the right to change prices at any time without notice.</li>
          <li>Product images are for illustrative purposes. Actual products may vary slightly in colour and appearance.</li>
          <li>We reserve the right to limit quantities or refuse any order at our sole discretion.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">4. Orders &amp; Payment</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>All orders are subject to availability and confirmation.</li>
          <li>Payment is processed securely through Paystack. We do not store your payment card details.</li>
          <li>An order is confirmed only after successful payment.</li>
          <li>We reserve the right to cancel orders suspected of fraud or unauthorised activity.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">5. Returns &amp; Refunds</h2>
        <p>
          <strong>All sales are final.</strong> We do not accept returns, exchanges, or issue refunds. Please review your order carefully before completing your purchase. If you receive a damaged or defective item, please contact us at <a href="mailto:Scheinen.co@gmail.com" className="underline">Scheinen.co@gmail.com</a> within 24 hours of delivery with photographic evidence, and we will work to resolve the issue.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">6. Intellectual Property</h2>
        <p>
          All content on this website — including logos, images, text, graphics, and design — is the property of SCHEINEN CO and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, SCHEINEN CO shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or purchase of products.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">8. Governing Law</h2>
        <p>
          These Terms &amp; Conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">9. Contact Us</h2>
        <p>
          For questions about these terms, contact us at:<br />
          <strong>SCHEINEN CO</strong><br />
          Email: <a href="mailto:Scheinen.co@gmail.com" className="underline">Scheinen.co@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
