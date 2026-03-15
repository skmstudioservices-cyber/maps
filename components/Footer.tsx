'use client';

import React from 'react';

const DARK_BG = "#0f172a";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: DARK_BG,
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '40px 24px',
      textAlign: 'center',
      color: '#64748b',
      fontSize: '14px',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{ marginBottom: '16px' }}>
        <span style={{ color: '#ffffff', fontWeight: '800' }}>
          New India <span style={{ color: '#D4AF37' }}>Maps</span>
        </span>
      </div>
      <p>© {new Date().getFullYear()} SKM Studio Services. All rights reserved.</p>
    </footer>
  );
}
