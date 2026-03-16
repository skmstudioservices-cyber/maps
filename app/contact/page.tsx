import React from 'react';

export default function ContactPage() {
  return (
    <div style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto', color: '#e8e9f0', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '42px', fontFamily: '"Playfair Display", serif', marginBottom: '24px', color: '#C9A84C' }}>Contact Support</h1>
      <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#8a8da0', maxWidth: '800px', marginBottom: '40px' }}>
        Need help with your business listing or have a general inquiry? We are here to help. Reach out to our support team and we will get back to you as soon as possible.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={{ padding: '30px', backgroundColor: '#1a1d2e', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#E8C97A' }}>Email Support</h3>
          <p style={{ color: '#e8e9f0' }}>skmstudio.services@gmail.com</p>
          <p style={{ color: '#8a8da0', marginTop: '12px', fontSize: '14px' }}>We aim to respond to all inquiries within 24 hours.</p>
        </div>
        
        <div style={{ padding: '30px', backgroundColor: '#1a1d2e', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#E8C97A' }}>Business Hours</h3>
          <p style={{ color: '#e8e9f0' }}>Monday - Friday</p>
          <p style={{ color: '#8a8da0', marginTop: '12px', fontSize: '14px' }}>9:00 AM - 6:00 PM (IST)</p>
        </div>
      </div>
    </div>
  );
}
