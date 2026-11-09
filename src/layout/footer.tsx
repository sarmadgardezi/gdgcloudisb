"use client";

import React from "react";
import Link from "next/link";

interface FooterProps {
  communityName?: string;
  joinUrl?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export default function Footer({
  communityName = "Cloud Islamabad",
  joinUrl = "#",
  socialLinks = {
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
}: FooterProps) {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-transparent">
      {/* Main Footer Container with Rounded Top Corners */}
      <div className="relative w-full rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] bg-[#21252E] text-white overflow-hidden shadow-2xl">
        {/* Top 4-Color Google Brand Stripe */}
        <div className="grid grid-cols-4 h-[3px] w-full">
          <div className="bg-[#4285F4]" /> {/* Google Blue */}
          <div className="bg-[#EA4335]" /> {/* Google Red */}
          <div className="bg-[#FBBC04]" /> {/* Google Yellow */}
          <div className="bg-[#34A853]" /> {/* Google Green */}
        </div>

        {/* Footer Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 md:pt-16 pb-8 md:pb-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16">
            {/* Left Side: Brand Logo, Description, CTA & Socials */}
            <div className="flex flex-col items-start max-w-md">
              {/* Google Developer Groups (GDG) Logo */}
              <Link
                href="/"
                aria-label="Google Developer Groups Cloud Islamabad"
                className="inline-block transition-transform hover:scale-105 duration-200"
              >
                <svg
                  className="w-20 h-12"
                  viewBox="0 0 88 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Left Bracket < */}
                  {/* Top Red Pill */}
                  <rect
                    x="-17"
                    y="-7"
                    width="34"
                    height="14"
                    rx="7"
                    transform="translate(25, 17) rotate(38)"
                    fill="#EA4335"
                  />
                  {/* Bottom Blue Pill */}
                  <rect
                    x="-17"
                    y="-7"
                    width="34"
                    height="14"
                    rx="7"
                    transform="translate(25, 35) rotate(-38)"
                    fill="#4285F4"
                  />

                  {/* Right Bracket > */}
                  {/* Top Green Pill */}
                  <rect
                    x="-17"
                    y="-7"
                    width="34"
                    height="14"
                    rx="7"
                    transform="translate(63, 17) rotate(-38)"
                    fill="#34A853"
                  />
                  {/* Bottom Yellow Pill */}
                  <rect
                    x="-17"
                    y="-7"
                    width="34"
                    height="14"
                    rx="7"
                    transform="translate(63, 35) rotate(38)"
                    fill="#FBBC04"
                  />
                </svg>
              </Link>

              {/* Tagline / Mission */}
              <p className="mt-5 text-[14px] leading-relaxed text-[#bdc1c6] font-normal max-w-sm">
                Empowering developers to build, learn, and grow together in the GDG {communityName} community.
              </p>

              {/* CTA Button and Social Media Icons */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {/* "Join our community" Button */}
                <Link
                  href={joinUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#21252E] text-[13.5px] font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-md active:scale-95"
                >
                  <span>Join our community</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>

                {/* Social Icons */}
                <div className="flex items-center gap-2">
                  {/* Instagram */}
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full bg-[#2a2f3a] border border-white/10 flex items-center justify-center text-[#9aa0a6] hover:text-white hover:bg-[#353b49] hover:border-white/20 transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>

                  {/* Twitter / X */}
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    className="w-9 h-9 rounded-full bg-[#2a2f3a] border border-white/10 flex items-center justify-center text-[#9aa0a6] hover:text-white hover:bg-[#353b49] hover:border-white/20 transition-all duration-200"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full bg-[#2a2f3a] border border-white/10 flex items-center justify-center text-[#9aa0a6] hover:text-white hover:bg-[#353b49] hover:border-white/20 transition-all duration-200"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 0 0-3.32 0 1.65 1.65 0 0 0 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-9 h-9 rounded-full bg-[#2a2f3a] border border-white/10 flex items-center justify-center text-[#9aa0a6] hover:text-white hover:bg-[#353b49] hover:border-white/20 transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Navigation Columns */}
            <div className="flex flex-wrap sm:flex-nowrap gap-12 sm:gap-20 md:gap-28 lg:mr-12">
              {/* Column 1: ABOUT */}
              <div>
                <h3 className="text-[11.5px] font-semibold text-[#9aa0a6] tracking-[0.16em] uppercase">
                  ABOUT
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/about"
                      className="text-[13.5px] text-[#bdc1c6] hover:text-white transition-colors duration-150"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-[13.5px] text-[#bdc1c6] hover:text-white transition-colors duration-150"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/brochure"
                      className="text-[13.5px] text-[#bdc1c6] hover:text-white transition-colors duration-150"
                    >
                      Brochure
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: RESOURCES */}
              <div>
                <h3 className="text-[11.5px] font-semibold text-[#9aa0a6] tracking-[0.16em] uppercase">
                  RESOURCES
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/articles"
                      className="text-[13.5px] text-[#bdc1c6] hover:text-white transition-colors duration-150"
                    >
                      Articles
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blogs"
                      className="text-[13.5px] text-[#bdc1c6] hover:text-white transition-colors duration-150"
                    >
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/gallery"
                      className="text-[13.5px] text-[#bdc1c6] hover:text-white transition-colors duration-150"
                    >
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faqs"
                      className="text-[13.5px] text-[#bdc1c6] hover:text-white transition-colors duration-150"
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal Links & Back to Top */}
          <div className="mt-14 md:mt-20 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] text-[#9aa0a6]">
            {/* Left: Copyright */}
            <div>
              <p>© GDG {communityName}. All rights reserved.</p>
            </div>

            {/* Right: Legal Links + Back to Top */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors duration-150"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors duration-150"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors duration-150"
              >
                Cookies Settings
              </Link>
              <Link
                href="/community-guidelines"
                className="hover:text-white transition-colors duration-150"
              >
                Community Guidelines
              </Link>

              {/* Vertical Separator */}
              <span className="text-[#5f6368] hidden sm:inline" aria-hidden="true">
                |
              </span>

              {/* Back to Top Button */}
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-150 group cursor-pointer"
                aria-label="Scroll back to top"
              >
                <span>Top</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-[#5f6368] group-hover:border-white text-[10px] transition-colors duration-150">
                  ↑
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };

