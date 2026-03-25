// MegaMenu.jsx
"use client";

import Link from "next/link";
import { megaMenuData } from "./megaMenuData";
import { CgChevronDown } from "react-icons/cg";

export default function MegaMenu() {
  return (
    <div className="hidden lg:block bg-white border-b border-gray-300 relative">
      {/* Top Menu */}
      <div className="container flex justify-between text-sm font-medium text-gray-700">
        {megaMenuData.map((menu, index) => {
          // If menu doesn't have submenu
          if (!menu.hasSubmenu) {
            return (
              <div key={index} className="py-3">
                <Link
                  href={`/${menu.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-primary transition font-bold flex items-center gap-1"
                >
                  {menu.label}
                </Link>
              </div>
            );
          }

          // If menu does have submenu
          return (
            <div key={index} className="group py-3">
              <button className="group-hover:text-primary transition font-bold flex items-center gap-1">
                {menu.label}
                <CgChevronDown className="w-4 h-4" />
              </button>

              {/* FULL WIDTH DROPDOWN */}
              <div className="absolute left-0 top-full w-full hidden group-hover:block z-50">
                <div className="container bg-white border border-gray-200 shadow-lg">
                  <div className="grid grid-cols-5 text-sm">
                    {menu.children.map((column, colIndex) => (
                      <div
                        key={colIndex}
                        className={`flex flex-col py-6 px-4 ${
                          colIndex % 2 === 1 ? "bg-gray-50" : ""
                        }`}
                      >
                        {/* Column Heading */}
                        <h3 className="font-bold text-gray-900 mb-3">
                          {column.heading}
                        </h3>

                        {/* Column Items */}
                        <div className="flex flex-col space-y-2">
                          {column.items.map((item, i) => (
                            <Link
                              key={i}
                              href={item.link}
                              className="text-gray-600 hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
