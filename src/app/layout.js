import { Suspense } from "react";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CTASection from "@/components/CTA/cta-section";

import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://cmpnd.cc"),
  title: "Compound - Regenerate",
  description: "A regeneration focused business that will sequester carbon, create biomass and more.", 
  keywords: ["compound", "regeneration", "codegrid", "cgmwt"],
  openGraph: {
    title: "Compound - Regenerate",
    description: "A regeneration focused business that will sequester carbon, create biomass and more.",
    url: "https://cmpnd.cc",
    siteName: "Compound",
    images: [
      {
        url: "/home/industry.jpg",
        width: 1200,
        height: 630,
        alt: "Compound - Regenerate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compound - Regenerate",
    description: "A regeneration focused business that will sequester carbon, create biomass and more.",
    images: ["/home/industry.jpg"],
    creator: "@cmpnd",
    site: "@cmpnd",
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <ProgressBar />
        </Suspense>
        <Navbar />
        {children}
        <CTASection />
        <Footer />
      </body>
    </html>
  );
}
