import React from 'react';

export default function PrivacyPage() {
  return (
    <div style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto', color: '#e8e9f0', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '42px', fontFamily: '"Playfair Display", serif', marginBottom: '24px', color: '#C9A84C' }}>Privacy Policy</h1>
      <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#8a8da0', marginBottom: '40px' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <section>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#e8e9f0' }}>1. Information We Collect</h2>
          <p style={{ color: '#8a8da0', lineHeight: '1.6' }}>We collect information you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us. This information may include: name, email address, phone number, postal address, profile picture, business details, and other information you choose to provide.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#e8e9f0' }}>2. How We Use Information</h2>
          <p style={{ color: '#8a8da0', lineHeight: '1.6' }}>We may use the information we collect from you to provide, maintain, and improve our services, including to facilitate business listings, process payments, and send related information such as confirmations and invoices.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#e8e9f0' }}>3. Data Security</h2>
          <p style={{ color: '#8a8da0', lineHeight: '1.6' }}>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
        </section>
      </div>
    </div>
  );
}
