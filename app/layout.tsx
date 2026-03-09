import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SKM Studio Maps – Find Local Businesses in Delhi, NCR & Gorakhpur",
    template: "%s | SKM Studio Maps",
  },
  description: "Discover verified local businesses across Delhi, NCR, Gorakhpur and all of India. Search restaurants, hotels, hospitals, salons and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('skm-theme') || 'light';
              document.documentElement.setAttribute('data-theme', theme);
            } catch(e) {}
          })();
        ` }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
