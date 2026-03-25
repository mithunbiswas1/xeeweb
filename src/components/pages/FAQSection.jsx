// src/components/pages/FAQSection.jsx

const FAQSection = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-xs transition-shadow"
            itemScope
            itemType="https://schema.org/Question"
          >
            <h3
              className="text-lg font-semibold mb-3 text-blue-600"
              itemProp="name"
            >
              {faq.question}
            </h3>
            <div
              className="text-gray-600"
              itemScope
              itemType="https://schema.org/Answer"
            >
              <div
                className="prose prose-sm"
                itemProp="text"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
