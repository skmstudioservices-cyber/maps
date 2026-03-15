'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      console.log('🔄 Auth Callback processing...');
      
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');

      if (code) {
        console.log('📜 Found code, exchanging for session...');
        await supabase.auth.exchangeCodeForSession(code);
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('❌ Session error:', sessionError);
        router.push('/login?error=session_failed');
        return;
      }

      if (session) {
        const userEmail = session.user.email;
        console.log('✅ Logged in as:', userEmail);

        if (userEmail === 'skmstudio.services@gmail.com') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        console.warn('⚠️ No session found after callback');
        router.push('/login?error=no_session');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#D4AF37',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }} />
        <p style={{ fontSize: '14px', fontWeight: '500' }}>Completing secure login...</p>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
