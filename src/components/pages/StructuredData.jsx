// src/components/pages/StructuredData.jsx

const StructuredData = ({ pageData, pageType, faqs = [], siteInfo }) => {
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

  const pageTitle = pageData.page_name || defaultTitles[pageType] || pageType;
  const pageUrl = pageData.page_link || `${siteInfo?.url}/page/${pageType}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: pageTitle,
        description: pageData.introduction || siteInfo?.description,
      },
      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
      {
        "@type": "Organization",
        name: siteInfo?.name,
        url: siteInfo?.url,
        logo: {
          "@type": "ImageObject",
          url: siteInfo?.logo,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};

export default StructuredData;
