export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-12">Last updated: September 2024</p>

        <p>
          SCHEINEN CO (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the Scheinen website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">1. Information We Collect</h2>
        <p>We collect information you provide directly to us:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Account Information:</strong> When you sign in with Google, we receive your name, email address, and profile picture from your Google account.</li>
          <li><strong>Order Information:</strong> When you make a purchase, we collect your shipping address, phone number, and payment details (processed securely by Paystack).</li>
          <li><strong>Usage Data:</strong> We automatically collect information about how you interact with our website, including pages visited, time spent, and device information.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>To process and fulfil your orders</li>
          <li>To communicate with you about orders, products, and promotions</li>
          <li>To improve our website and services</li>
          <li>To prevent fraud and ensure security</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">3. Third-Party Services</h2>
        <p>We use the following third-party services that may collect data:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Google OAuth:</strong> For secure authentication. Subject to <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</li>
          <li><strong>Paystack:</strong> For payment processing. Subject to <a href="https://paystack.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">Paystack&apos;s Privacy Policy</a>. We do not store your card details.</li>
          <li><strong>Vercel:</strong> For website hosting and analytics.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">4. Data Security</h2>
        <p>
          We implement appropriate technical and organisational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">5. Data Retention</h2>
        <p>
          We retain your personal information for as long as your account is active or as needed to provide you services, comply with legal obligations, resolve disputes, and enforce our agreements.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Access your personal data</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:Scheinen.co@gmail.com" className="underline">Scheinen.co@gmail.com</a>.</p>

        <h2 className="text-xl font-semibold mt-10 mb-4">7. Cookies</h2>
        <p>
          We use cookies and similar technologies to maintain your session, remember your preferences, and improve your experience. You can control cookies through your browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">9. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:<br />
          <strong>SCHEINEN CO</strong><br />
          Email: <a href="mailto:Scheinen.co@gmail.com" className="underline">Scheinen.co@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
