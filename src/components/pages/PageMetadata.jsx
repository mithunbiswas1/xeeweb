// src/components/pages/PageMetadata.jsx

import { siteInfo } from "@/siteInfo/siteInfo";

export async function generatePageMetadata(pageType, pageData) {
  const defaultTitles = {
    "about-us": "About Us",
    advertisement: "Advertisement",
    "terms-and-condition": "Terms & Conditions",
    certification: "Certification",
    "customer-care": "Customer Care",
    faq: "FAQ",
    payments: "Payments",
    "privacy-policy": "Privacy Policy",
    "report-infringement": "Report Infringement",
    "returns-and-refunds": "Returns & Refunds",
    "security-policy": "Security Policy",
  };

  const defaultTitle = defaultTitles[pageType] || pageType;
  const pageUrl = pageData.page_link || `${siteInfo?.url}/page/${pageType}`;
  const pageTitle =
    pageData.meta_title || `${defaultTitle} | ${siteInfo?.name}`;
  const pageDescription =
    pageData.meta_description || pageData.introduction || siteInfo?.description;

  const images = pageData.photo
    ? [
        {
          url: pageData.photo,
          width: 1200,
          height: 630,
          alt: pageData.page_name || defaultTitle,
        },
      ]
    : [
        {
          url: siteInfo?.seo?.defaultImage,
          width: 1200,
          height: 630,
          alt: siteInfo?.name,
        },
      ];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageData.keyword || siteInfo?.keywords,

    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: pageUrl,
      siteName: siteInfo?.name,
      images: images,
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: pageData.photo ? [pageData.photo] : [siteInfo?.seo?.defaultImage],
    },

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: pageData.canonical_tag || pageData.page_link || pageUrl,
    },
  };
}
