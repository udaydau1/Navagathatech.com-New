import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit for a modern tech look
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.navagathatech.com"),
  title: {
    default: "Navagatha Tech Pvt. Ltd. | Next-Generation IT Services",
    template: "%s | Navagatha Tech"
  },
  description: "Navagatha Tech is a strategic partner for IT transformation, application development, and modern innovation. We empower businesses through technology innovation and reliable delivery.",
  keywords: ["Navagatha Tech", "IT Services", "Application Development", "Digital Transformation", "IT Consulting", "Strategic IT Partner", "Software Development India"],
  authors: [{ name: "Navagatha Tech Team" }],
  creator: "Navagatha Tech",
  publisher: "Navagatha Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Navagatha Tech Pvt. Ltd. | Next-Generation IT Services",
    description: "Empowering businesses through technology innovation and reliable IT delivery.",
    url: "https://www.navagathatech.com",
    siteName: "Navagatha Tech",
    images: [
      {
        url: "/images/logo_navagatha.png", // Using the existing logo for social sharing
        width: 1200,
        height: 630,
        alt: "Navagatha Tech Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Navagatha Tech Pvt. Ltd. | Next-Generation IT Services",
    description: "Next-generation IT services and digital transformation partnership.",
    images: ["/images/logo_navagatha.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Navagatha Tech Pvt. Ltd.",
  "url": "https://www.navagathatech.com",
  "logo": "https://www.navagathatech.com/images/logo_navagatha.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91 22 45705334",
    "contactType": "customer service",
    "email": "info@navagathatech.com",
    "availableLanguage": ["en", "Hindi"]
  },
  "sameAs": [
    // Add LinkedIn/Twitter URLs here if available later
  ],
  "description": "Next-generation IT services company driven by technology innovation and reliable delivery.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office No. 112, A wing, 1st floor, Crystal plaza premises co - operative society ltd. New link road, Opposite infinity mall",
    "addressLocality": "Andheri (west) Mumbai",
    "postalCode": "400053",
    "addressCountry": "IN"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
