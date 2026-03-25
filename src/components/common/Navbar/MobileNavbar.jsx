// src/components/common/Navbar/MobileNavbar.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineLogout, AiOutlineShoppingCart } from "react-icons/ai";
import { CgMenu } from "react-icons/cg";
import { mobileSidebarItems } from "./navItems";
import { useGetSettingApiQuery } from "@/redux/features/settingApi";
import { useCart } from "@/context/CartContext"; // Import useCart hook
import { useEffect, useState } from "react";

export default function MobileNavbar({ isOpen, setIsOpen }) {
  const { data } = useGetSettingApiQuery();
  const { company_name, logo } = data || {};

  // Use cart context
  const { cartCount } = useCart();

  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState("/avatar.png");

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("accessToken");
      const image = localStorage.getItem("user?.image");
      const name = localStorage.getItem("user?.name");
      setIsLoggedIn(!!token);
      if (image) setAvatar(image);
    };

    checkLoginStatus();
    window.addEventListener("login", checkLoginStatus);
    return () => window.removeEventListener("login", checkLoginStatus);
  }, []);

  const handleLoginSuccess = () => {
    if (selectedItem) {
      window.location.href = selectedItem.link;
      setSelectedItem(null);
    }
  };

  return (
    <>
      <div className="md:hidden block">
        <div className="container flex items-center justify-between">
          {/* Menu + Logo */}
          <div className="flex items-center gap-6">
            <CgMenu
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsOpen(true)}
            />

            <Link href="/" className="flex-shrink-0">
              <Image
                src={logo || "/logo.webp"}
                alt={company_name || "Logo"}
                width={128}
                height={38}
                priority
                className="h-full w-auto"
              />
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Image
                src={avatar}
                alt="User Avatar"
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-base font-normal"
              >
                <FaRegCircleUser className="w-5 h-5" />
                Login
              </Link>
            )}

            {/* Updated Cart Link with Badge - Matches DesktopNavbar */}
            <Link href="/cart" className="flex items-center gap-1 relative">
              <div className="relative">
                <AiOutlineShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center min-w-[16px] px-0.5">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-74 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-[#2874F0] text-white px-4 py-4.25 flex items-center justify-between">
          {isLoggedIn ? (
            <div className="flex items-center gap-2 w-full">
              <Image
                src={avatar}
                alt="User Avatar"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="font-medium">{name || "Hi, User"}</span>

              {/* Push this button to the right */}
              <button
                onClick={() => {
                  localStorage.clear();
                  setIsLoggedIn(false);
                  setAvatar("/avatar.png");
                }}
                className="ml-auto bg-red-100 hover:bg-red-400 text-red-500 hover:text-white px-2 py-0.5 rounded flex items-center gap-1 text-sm"
              >
                Logout <AiOutlineLogout className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2">
              <FaRegCircleUser className="w-4 h-4" />
              <span className="font-medium">Login & Signup</span>
            </Link>
          )}
        </div>

        {/* Menu Items */}
        {mobileSidebarItems.map((item, index) =>
          isLoggedIn ? (
            <Link
              key={index}
              href={item.link}
              className="px-4 py-2 flex items-center gap-4 text-sm text-[#353535] cursor-pointer hover:bg-gray-50"
            >
              {item.icon && <span className="text-lg w-6">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          ) : (
            <button
              key={index}
              onClick={() => handleMenuItemClick(item)}
              className="w-full text-left px-4 py-2 flex items-center gap-4 text-sm text-[#353535] cursor-pointer hover:bg-gray-50"
            >
              {item.icon && <span className="text-lg w-6">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ),
        )}
      </div>
    </>
  );
}
