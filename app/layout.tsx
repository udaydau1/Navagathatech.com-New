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
  title: "Navagatha Tech Pvt. Ltd. | Next-Generation IT Services",
  description: "Navagatha Tech is a strategic partner for IT transformation, application development, and modern innovation.",
  keywords: ["Navagatha Tech", "IT Services", "Application Development", "Digital Transformation"],
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
        {children}
      </body>
    </html>
  );
}
