import React from 'react';

export default function TermsPage() {
  return (
    <div style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto', color: '#e8e9f0', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '42px', fontFamily: '"Playfair Display", serif', marginBottom: '24px', color: '#C9A84C' }}>Terms of Service</h1>
      <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#8a8da0', marginBottom: '40px' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <section>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#e8e9f0' }}>1. Acceptance of Terms</h2>
          <p style={{ color: '#8a8da0', lineHeight: '1.6' }}>By accessing and using SKM Studio Maps, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#e8e9f0' }}>2. Provision of Services</h2>
          <p style={{ color: '#8a8da0', lineHeight: '1.6' }}>SKM Studio Maps is constantly innovating in order to provide the best possible experience for its users. You acknowledge and agree that the form and nature of the Services which SKM Studio Maps provides may change from time to time without prior notice to you.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#e8e9f0' }}>3. Business Listings</h2>
          <p style={{ color: '#8a8da0', lineHeight: '1.6' }}>When creating a business listing, you agree to provide accurate, current, and complete information. SKM Studio Maps reserves the right to remove any listing that is deemed inappropriate, misleading, or violates our content policies.</p>
        </section>
        
        <section>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#e8e9f0' }}>4. Termination</h2>
          <p style={{ color: '#8a8da0', lineHeight: '1.6' }}>We may terminate your access to the site, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account.</p>
        </section>
      </div>
    </div>
  );
}
