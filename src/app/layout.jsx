// src/app/layout.jsx

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { nekst } from "@/font/nekst/nekst";

import Script from "next/script";
import { Toaster } from "sonner";

import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer/Footer";
import ReduxProvider from "@/redux/reduxProvider/ReduxProvider";
import MegaMenu from "@/components/common/Navbar/MegaMenu";
import { CartProvider } from "@/context/CartContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

// ===== Static Settings for xeeweb.com =====
const STATIC_SETTINGS = {
  website_title: "XeeWeb",
  website_name: "XeeWeb",
  meta_description:
    "XeeWeb - Under Construction. Explore our upcoming platform soon!",
  web_address: "https://xeeweb.com",
  favicon: "/favicon.ico",
  logo: "/logo.png",
  json_schema: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "XeeWeb",
    url: "https://xeeweb.com",
  }),
  google_tag_manager: null, // add GTM code here if needed
};

export const metadata = {
  title: {
    default: STATIC_SETTINGS.website_title,
    template: `%s | ${STATIC_SETTINGS.website_name}`,
  },
  description: STATIC_SETTINGS.meta_description,
  metadataBase: new URL(STATIC_SETTINGS.web_address),
  alternates: { canonical: STATIC_SETTINGS.web_address },
  icons: {
    icon: STATIC_SETTINGS.favicon,
    shortcut: STATIC_SETTINGS.favicon,
    apple: STATIC_SETTINGS.favicon,
  },
  openGraph: {
    title: STATIC_SETTINGS.website_title,
    description: STATIC_SETTINGS.meta_description,
    url: STATIC_SETTINGS.web_address,
    siteName: STATIC_SETTINGS.website_name,
    images: [
      {
        url: STATIC_SETTINGS.logo,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: STATIC_SETTINGS.website_title,
    description: STATIC_SETTINGS.meta_description,
    images: [STATIC_SETTINGS.logo],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {STATIC_SETTINGS.json_schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: STATIC_SETTINGS.json_schema,
            }}
          />
        )}

        {STATIC_SETTINGS.google_tag_manager && (
          <Script id="gtm" strategy="beforeInteractive">
            {STATIC_SETTINGS.google_tag_manager}
          </Script>
        )}
      </head>

      <body
        className={`${jakarta.variable} ${nekst.variable} cz-shortcut-listen="true"`}
      >
        <ReduxProvider>
          <CartProvider>
            {/* <Navbar />
            <MegaMenu /> */}
            {children}
            {/* <Footer /> */}
          </CartProvider>
        </ReduxProvider>

        <Toaster />
      </body>
    </html>
  );
}
