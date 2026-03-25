"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import { footerData } from "./footerData";
import { useGetSettingApiQuery } from "@/redux/features/settingApi";

const Footer = () => {
  const { data, isLoading, isError } = useGetSettingApiQuery();

  const socialLinks = [
    { label: "Facebook", href: data?.facebook || "#", icon: FaFacebook },
    { label: "Instagram", href: data?.instagram || "#", icon: FaInstagram },
    { label: "WhatsApp", href: data?.whatsapp || "#", icon: FaWhatsapp },
    { label: "Twitter", href: data?.twitter || "#", icon: FaTwitter },
    { label: "YouTube", href: data?.youtube || "#", icon: FaYoutube },
    { label: "LinkedIn", href: data?.linkedin || "#", icon: FaLinkedin },
  ];

  return (
    <footer className="bg-gray-100 pt-10 border-t border-white">
      <div className="container mx-auto px-4">
        {/* Top Section: 4 equal sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-between pb-10 border-b border-gray-300 md:text-left">
          {/* Section 1: Logo + Contact + Social */}
          <div className="">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={data?.logo || "/logo.webp"}
                alt={data?.company_name || "Logo"}
                width={128}
                height={38}
                priority
                className="w-[128px] h-[38px]"
              />
            </Link>

            <p className="text-gray-700 py-1">
              Got Question? Call us 9 AM- 10 PM
            </p>

            {data?.phone && (
              <Link
                href={`tel:${data?.phone}`}
                className="text-gray-900 hover:text-primary font-bold transition-all duration-200"
              >
                {data?.phone}
              </Link>
            )}

            <p className="text-sm text-gray-700 pt-2">Follow Us</p>
            <div className="flex space-x-3 mt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    className="text-white bg-gray-400 hover:bg-gray-500 p-1 rounded-sm transition-colors text-xl"
                  >
                    {Icon && <Icon />}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sections 2-4: Menus */}
          {footerData.map((menu) => (
            <div key={menu.id} className="lg:mx-auto">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase">
                {menu.title}
              </h3>
              <ul className="space-y-1">
                {menu.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-gray-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="py-6 text-xs md:text-sm text-gray-500 space-y-1 lg:text-center">
          <p>{data?.footer_information}</p>
          <p>© 2026 {data?.company_name || "Xengomart"} </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
