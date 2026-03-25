// src/components/pages/PageContent.jsx

import FAQSection from "./FAQSection";
import EmptyState from "./EmptyState";

const PageContent = ({ pageData }) => {
  let faqs = [];

  try {
    faqs = pageData.faqs ? JSON.parse(pageData.faqs) : [];
  } catch (error) {
    console.error("Error parsing FAQs:", error);
    return <EmptyState message="Error loading page content." />;
  }

  return (
    <>
      {/* Page Content */}
      {pageData.description ? (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8">
          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: pageData.description }} />
          </article>
        </div>
      ) : (
        <EmptyState message="We're working on updating this page." />
      )}

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </>
  );
};

export default PageContent;
