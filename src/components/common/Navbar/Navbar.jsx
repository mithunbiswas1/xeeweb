// src/components/common/Navbar/Navbar.jsx

"use client";

import { useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-white py-3.5">
      <DesktopNavbar />
      <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
