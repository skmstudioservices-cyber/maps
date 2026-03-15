import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "New India Maps - The Premium Business Directory",
  description: "Discover verified businesses across India with ultra-precise location mapping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ 
        margin: 0, 
        backgroundColor: '#0f172a', 
        fontFamily: "'DM Sans', sans-serif" 
      }}>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
