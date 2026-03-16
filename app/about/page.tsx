import React from 'react';

export default function AboutPage() {
  return (
    <div style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto', color: '#e8e9f0', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '42px', fontFamily: '"Playfair Display", serif', marginBottom: '24px', color: '#C9A84C' }}>About Us</h1>
      <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#8a8da0', maxWidth: '800px' }}>
        SKM Studio Maps is India's premium business directory. Our goal is to connect users with verified, high-quality businesses across the country. 
        Whether you are looking for a top-rated restaurant in Delhi or a reliable hospital in Gorakhpur, we bring everything to your fingertips with accurate location mapping and direct connectivity.
      </p>
      <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#1a1d2e', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Our Mission</h3>
        <p style={{ color: '#8a8da0', lineHeight: '1.6' }}>To empower local businesses by providing them a premium digital storefront and providing users with the most accurate and trustworthy business directory in India.</p>
      </div>
    </div>
  );
}
