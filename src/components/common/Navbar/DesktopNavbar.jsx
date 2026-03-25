// src/components/common/Navbar/DesktopNavbar.jsx (with Cart Context)

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { AiOutlineShoppingCart, AiOutlineLogout } from "react-icons/ai";

import { loginMenuItems, moreMenuItems } from "./navItems";
import { useGetSettingApiQuery } from "@/redux/features/settingApi";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";

export default function DesktopNavbar() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [showLoginTooltip, setShowLoginTooltip] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState("/avatar.png");

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("accessToken");
      const image = localStorage.getItem("image");
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

  const { data } = useGetSettingApiQuery();
  const { company_name, logo } = data || {};

  // Use cart context
  const { cartCount } = useCart();

  const loginTimeout = useRef(null);
  const moreTimeout = useRef(null);

  const openDropdown = (setOpen, timeoutRef) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const scheduleCloseDropdown = (setOpen, timeoutRef) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (loginTimeout.current) clearTimeout(loginTimeout.current);
      if (moreTimeout.current) clearTimeout(moreTimeout.current);
    };
  }, []);

  const dropdownStyle =
    "transition-opacity duration-200 absolute left-1/2 -translate-x-1/2 top-full mt-4 w-54 bg-white shadow-2xl text-sm text-[#333333] z-50";

  const dropdownMenuStyle =
    "flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-gray-50";

  return (
    <div className="md:block hidden">
      <div className="container flex items-center gap-4">
        {/* Logo */}
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

        {/* Search */}
        <SearchBar />

        {/* Right Menu */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          {/* Login */}
          <div
            className="relative"
            onMouseEnter={() => {
              openDropdown(setIsLoginOpen, loginTimeout);
              setShowLoginTooltip(true);
            }}
            onMouseLeave={() => {
              scheduleCloseDropdown(setIsLoginOpen, loginTimeout);
              setShowLoginTooltip(false);
            }}
          >
            {isLoggedIn ? (
              <Image src={avatar} alt="User Avatar" width={32} height={32} />
            ) : (
              <Link
                href="/login"
                className="bg-white text-[#2874F0] px-8 py-1.5"
              >
                Login
              </Link>
            )}

            <div
              className={`${dropdownStyle} ${
                isLoginOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {!isLoggedIn && (
                <div className="px-3 py-2.5 flex justify-between">
                  <span>New customer?</span>
                  <Link
                    href="/registration"
                    className="text-blue-600 font-semibold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {isLoggedIn
                ? loginMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.link}
                      className={dropdownMenuStyle}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))
                : loginMenuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleMenuItemClick(item)}
                      className={`${dropdownMenuStyle} w-full text-left`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}

              {/* Logout button if logged in */}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    setAvatar("/avatar.png");
                    setIsLoginOpen(false);
                    router.push("/");
                  }}
                  className={`${dropdownMenuStyle} w-full text-left bg-red-100 hover:bg-red-400 text-red-500 hover:text-white`}
                >
                  <span className="text-lg">
                    <AiOutlineLogout />
                  </span>
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* More */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown(setIsMoreOpen, moreTimeout)}
            onMouseLeave={() =>
              scheduleCloseDropdown(setIsMoreOpen, moreTimeout)
            }
          >
            <button className="flex items-center gap-1">
              More
              <FaChevronDown
                className={`transition ${isMoreOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`${dropdownStyle} ${
                isMoreOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {moreMenuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.link}
                  className={dropdownMenuStyle}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* In DesktopNavbar.jsx - Update the cart link  */}
          <Link href="/cart" className="flex items-center gap-1 relative">
            <div className="relative">
              <AiOutlineShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center min-w-[16px] px-0.5">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
