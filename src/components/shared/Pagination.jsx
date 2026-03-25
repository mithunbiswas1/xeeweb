"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ links = [], currentPage = 1 }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!links.length) return null;

  // Filter out the "..." links if they exist and clean up labels
  const processedLinks = links.map(link => ({
    ...link,
    label: link.label
      .replace("&laquo;", "←")
      .replace("&raquo;", "→")
      .replace("Previous", "Prev")
  }));

  // Function to extract page number from URL
  const getPageFromUrl = (url) => {
    if (!url) return null;
    const urlObj = new URL(url);
    return urlObj.searchParams.get('page');
  };

  return (
    <div className="flex justify-center mt-10">
      <ul className="flex items-center gap-2 flex-wrap">
        {processedLinks.map((link, index) => {
          const page = link.page || getPageFromUrl(link.url);
          
          // Create new URL with updated page parameter
          const getNewUrl = () => {
            if (!link.url) return '#';
            
            const params = new URLSearchParams(searchParams.toString());
            
            if (page) {
              params.set('page', page);
            }
            
            return `${pathname}?${params.toString()}`;
          };

          return (
            <li key={index}>
              {link.url && !link.active ? (
                <Link
                  href={getNewUrl()}
                  className={`px-4 py-2 text-sm rounded border border-gray-400 transition ${
                    link.active
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-label={`Go to page ${page || 'unknown'}`}
                >
                  {link.label}
                </Link>
              ) : (
                <span
                  className={`px-4 py-2 text-sm border rounded ${
                    link.active
                      ? "bg-primary text-white border-primary cursor-default"
                      : "bg-white text-gray-400 border-gray-200 cursor-not-allowed"
                  }`}
                  aria-current={link.active ? "page" : undefined}
                >
                  {link.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}