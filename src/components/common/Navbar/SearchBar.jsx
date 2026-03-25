"use client";

import { useState, useRef, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

// Example static product list
const products = [
  {
    id: 1,
    slug: "product-1",
    product_name: "Red T-Shirt",
    sale_price: 499,
    photo: "/products/red-tshirt.jpg",
  },
  {
    id: 2,
    slug: "product-2",
    product_name: "Blue Jeans",
    sale_price: 1299,
    photo: "/products/blue-jeans.jpg",
  },
  {
    id: 3,
    slug: "product-3",
    product_name: "Leather Wallet",
    sale_price: 899,
    photo: "/products/leather-wallet.jpg",
  },
  {
    id: 4,
    slug: "product-4",
    product_name: "Sports Shoes",
    sale_price: 2499,
    photo: "/products/sports-shoes.jpg",
  },
  {
    id: 5,
    slug: "product-5",
    product_name: "Sunglasses",
    sale_price: 699,
    photo: "/products/sunglasses.jpg",
  },
];

export default function SearchBar() {
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter products locally
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = products
      .filter((p) => p.product_name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5); // Show only 5 results

    setResults(filtered);
  }, [query]);

  return (
    <div ref={wrapperRef} className="flex-1 relative bg-white text-black">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-1.5 px-4 text-sm outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}

        <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2874F0]" />
      </div>

      {/* Search Result Dropdown */}
      {query && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full bg-white shadow-lg border border-gray-300 mt-1 z-50">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 border-b border-gray-300 last:border-none"
            >
              <Image
                src={product.photo || "/placeholder.jpg"}
                alt={product.product_name}
                width={40}
                height={40}
                className="rounded object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium line-clamp-1">
                  {product.product_name}
                </span>
                <span className="text-xs text-gray-500">
                  ৳{product.sale_price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full bg-white shadow-lg border border-gray-300 mt-1 z-50 p-3 text-sm text-gray-500">
          No item found
        </div>
      )}
    </div>
  );
}
