import React from "react";

export function PrivacyPolicy() {
  return (
    <div className="max-w-4xl px-4 py-8 space-y-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          This Privacy Policy describes how we collect, use, and handle your
          personal information when you use our services. By using our services,
          you agree to the collection and use of information in accordance with
          this policy.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">
          2. Information We Collect
        </h2>
        <div className="space-y-4">
          <h3 className="text-xl font-medium">2.1 Personal Information</h3>
          <p className="text-gray-700 leading-relaxed">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Any other information you choose to provide</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-medium">
            2.2 Automatically Collected Information
          </h3>
          <p className="text-gray-700 leading-relaxed">
            When you use our services, we automatically collect certain
            information about your device and usage, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Device information (IP address, browser type, operating system)
            </li>
            <li>Usage data (pages visited, time spent, features used)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">
          3. How We Use Your Information
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We use the collected information for various purposes, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Providing and maintaining our services</li>
          <li>Improving and personalizing user experience</li>
          <li>Communicating with you about updates and support</li>
          <li>Processing transactions and payments</li>
          <li>Detecting and preventing fraud</li>
          <li>Complying with legal obligations</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">
          4. Information Sharing and Disclosure
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may share your information in the following circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>With service providers who assist in our operations</li>
          <li>When required by law or legal process</li>
          <li>To protect our rights and safety</li>
          <li>In connection with a business transfer or acquisition</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
        <p className="text-gray-700 leading-relaxed">
          We implement appropriate technical and organizational security
          measures to protect your personal information against unauthorized
          access, alteration, disclosure, or destruction. However, no method of
          transmission over the internet or electronic storage is 100% secure.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">
          6. Your Rights and Choices
        </h2>
        <p className="text-gray-700 leading-relaxed">
          You have certain rights regarding your personal information,
          including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Accessing and updating your information</li>
          <li>Requesting deletion of your data</li>
          <li>Opting out of marketing communications</li>
          <li>Managing cookie preferences</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">
          7. Changes to This Policy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page and
          updating the "Last updated" date.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <p className="text-gray-700">
          Email: privacy@breathtake.com
          <br />
          Address: [Your Company Address]
        </p>
      </section>
    </div>
  );
}
