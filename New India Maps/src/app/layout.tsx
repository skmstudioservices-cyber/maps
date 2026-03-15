import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "SKM Studio Maps | India's Open Local Knowledge Network",
  description: "Connect with verified local businesses across India. Featuring real reviews, digital maps, and premium business profiles.",
  keywords: "India Maps, Local Business Directory, Verified Businesses, SKM Studio, Digital India",
  authors: [{ name: "SKM Studio" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground antialiased selection:bg-gold selection:text-black`}
      >
        {/* Main Application Container */}
        <main id="skm-app-root">
          {children}
        </main>
        
        {/* Placeholder for global components like Toasts or Modals */}
        <div id="modal-root" />
      </body>
    </html>
  );
}
