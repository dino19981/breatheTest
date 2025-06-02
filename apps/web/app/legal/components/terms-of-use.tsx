import React from "react";

export function TermsOfUse() {
  return (
    <div className="max-w-4xl px-4 py-8 space-y-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
        <p className="text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to Breathtake. These Terms of Use govern your access to and
          use of our website, services, and applications. By accessing or using
          our services, you agree to be bound by these Terms and our Privacy
          Policy.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">
          2. Account Registration and Security
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            To access certain features of our services, you may need to create
            an account. You agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update your information if it changes</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">
          3. User Responsibilities
        </h2>
        <p className="text-gray-700 leading-relaxed">
          You agree to use our services in compliance with all applicable laws
          and regulations. Specifically, you will not:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Violate any laws or regulations</li>
          <li>Infringe upon the rights of others</li>
          <li>Interfere with or disrupt our services</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Use our services for any illegal or unauthorized purpose</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">
          4. Intellectual Property Rights
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            All content on our platform, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Text, graphics, logos, and images</li>
            <li>Software and source code</li>
            <li>Design elements and layout</li>
            <li>Trademarks and service marks</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            is owned by or licensed to us and is protected by intellectual
            property laws. You may not use, reproduce, or distribute any content
            without our express written permission.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>
        <p className="text-gray-700 leading-relaxed">
          By submitting content to our platform, you:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            Grant us a worldwide, non-exclusive license to use, modify, and
            distribute your content
          </li>
          <li>Represent that you have all necessary rights to the content</li>
          <li>Agree that we may remove content that violates these Terms</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">
          6. Limitation of Liability
        </h2>
        <p className="text-gray-700 leading-relaxed">
          To the maximum extent permitted by law, we shall not be liable for:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Any indirect, incidental, or consequential damages</li>
          <li>Loss of profits, data, or business opportunities</li>
          <li>Damages resulting from unauthorized access to your account</li>
          <li>Any errors or omissions in our services</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
        <p className="text-gray-700 leading-relaxed">
          We reserve the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Suspend or terminate your account at any time</li>
          <li>Remove or modify any content</li>
          <li>Discontinue any part of our services</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          We may modify these Terms at any time. We will notify you of any
          material changes by posting the new Terms on this page and updating
          the "Last updated" date. Your continued use of our services after such
          changes constitutes your acceptance of the new Terms.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
        <p className="text-gray-700 leading-relaxed">
          These Terms shall be governed by and construed in accordance with the
          laws of [Your Jurisdiction], without regard to its conflict of law
          provisions.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="text-gray-700">
          Email: legal@breathtake.com
          <br />
          Address: [Your Company Address]
        </p>
      </section>
    </div>
  );
}
