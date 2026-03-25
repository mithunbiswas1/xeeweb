// app/page/about-us/page.jsx
"use client"; // optional if you need interactivity; remove if fully static

import StructuredData from "@/components/pages/StructuredData";
import PageHero from "@/components/pages/PageHero";
import PageContent from "@/components/pages/PageContent";

// Static page data
const STATIC_PAGE_DATA = {
  title: "About Us",
  subtitle: "Learn more about XeeWeb",
  description:
    "XeeWeb is your trusted platform for building modern web solutions with ease.",
  content: `
    <p>Welcome to XeeWeb! We are dedicated to providing the best web solutions for individuals and businesses alike.</p>
    <p>Our team of experts focuses on building websites that are fast, reliable, and user-friendly.</p>
  `,
  faqs: [
    {
      question: "What is XeeWeb?",
      answer:
        "XeeWeb is a modern web platform for building websites and applications.",
    },
    {
      question: "How can I contact XeeWeb?",
      answer: "You can reach us via email at contact@xeeweb.com.",
    },
  ],
  photo: "/images/about-banner.jpg", // static banner image
  meta_description:
    "About XeeWeb – Learn about our mission, team, and services.",
};

const AboutUsPage = () => {
  const pageData = STATIC_PAGE_DATA;
  const faqs = pageData.faqs || [];
  const bannerImage = pageData.photo;

  return (
    <>
      <StructuredData pageData={pageData} pageType="about-us" faqs={faqs} />

      <PageHero
        pageData={pageData}
        bannerImage={bannerImage}
        pageType="about-us"
      />

      <PageContent pageData={pageData} />
    </>
  );
};

export default AboutUsPage;
