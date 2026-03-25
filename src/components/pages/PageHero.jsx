// src/components/pages/PageHero.jsx

import Link from "next/link";

const PageHero = ({ pageData, bannerImage, pageType }) => {
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

  return (
    <div className="relative rounded-b-sm mb-8 overflow-hidden min-h-50 flex items-center">
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${bannerImage}")` }}
      >
        <div className="absolute inset-0 bg-primary/95"></div>
      </div>

      {/* pattern */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute -rotate-12 -top-10 -left-10 w-40 h-40 bg-white rounded-sm"></div>
        <div className="absolute rotate-45 top-20 right-20 w-60 h-60 bg-white rounded-sm"></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-white rounded-sm opacity-20"></div>
      </div>

      {/* content */}
      <div className="relative z-20 px-8 py-6 text-center text-white w-full">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{pageTitle}</h1>
        {pageData.introduction && (
          <h3 className="text-base lg:text-lg lg:mb-6 max-w-3xl mx-auto opacity-90">
            {pageData.introduction}
          </h3>
        )}

        {/* Breadcrumb */}
        <nav className="hidden lg:block text-sm" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center justify-center space-x-0.5">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-100 hover:text-gray-50">
                Home
              </Link>
              <span className="mx-0.5 text-gray-400">/</span>
            </li>

            <li className="inline-flex items-center text-gray-300">
              {pageTitle}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default PageHero;
