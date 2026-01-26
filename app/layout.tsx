import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit for a modern tech look
import "./globals.css";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/schema";

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
  description: "Navagatha Tech is a strategic partner for IT transformation, application development and modern innovation. We empower businesses through technology innovation and reliable delivery.",
  keywords: [
    "Navagatha Tech",
    "IT Services India",
    "Application Development",
    "Digital Transformation",
    "IT Consulting",
    "Strategic IT Partner",
    "Software Development India",
    "Legacy Modernization",
    "SAP Implementation",
    "AS400 Modernization",
    "Cloud Migration Services",
    "DevOps Consulting",
    "AI Machine Learning Services",
    "Enterprise IT Solutions Mumbai"
  ],
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
        url: "/images/logo_navagatha.png",
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
  manifest: '/manifest.webmanifest',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get enhanced schema data
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/brand-logo.png?v=10" type="image/png" />
        <link rel="shortcut icon" href="/brand-logo.png?v=10" />
        <link rel="apple-touch-icon" href="/brand-logo.png?v=10" />
      </head>
      <body
        className={`${outfit.variable} antialiased bg-background text-foreground`}
      >
        {/* Organization & LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* WebSite Schema with Search Action */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
