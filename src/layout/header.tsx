"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  communityUrl?: string;
}

export default function Header({}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#dadce0] transition-colors">
      {/* 4-Color Google Brand Bar */}
      <div className="grid grid-cols-4 h-[3px] w-full">
        <div className="bg-[#4285F4]" />
        <div className="bg-[#EA4335]" />
        <div className="bg-[#FBBC04]" />
        <div className="bg-[#34A853]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-[84px]">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90 shrink-0"
            aria-label="Google Developer Group Cloud Islamabad Home"
          >
            <Image
              src="/image/raw/Left-Aligned-Logo.png"
              alt="Google Developer Group Cloud Islamabad"
              width={320}
              height={74}
              priority
              className="h-11 sm:h-13 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="#about"
              className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
            >
              Overview
            </Link>
            <Link
              href="#devfest"
              className="rounded-lg px-3.5 py-2 text-[14px] font-semibold text-[#ea4335] hover:bg-[#fce8e6] transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#ea4335] animate-ping" />
              <span>DevFest 2026</span>
            </Link>
            <Link
              href="#pillars"
              className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
            >
              Focus Areas
            </Link>
            <Link
              href="#events"
              className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
            >
              Events &amp; Labs
            </Link>
            <Link
              href="#team"
              className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
            >
              Team
            </Link>
            <Link
              href="/portal"
              className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-[#1a73e8] hover:bg-[#e8f0fe] transition-colors"
            >
              Portal
            </Link>
            <a
              href="https://cloud.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors inline-flex items-center gap-1"
            >
              <span>Google Cloud</span>
              <svg className="w-3.5 h-3.5 text-[#80868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-5 py-2.5 text-[14px] font-medium text-white shadow-sm transition-all duration-150 hover:bg-[#1557d0] hover:shadow active:scale-[0.98]"
            >
              <span>Join community</span>
              <svg
                className="w-4 h-4"
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
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-[#dadce0] text-[#5f6368] hover:bg-[#f1f3f4] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#dadce0] py-3 space-y-1">
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#3c4043] hover:bg-[#f1f3f4]"
            >
              Overview
            </Link>
            <Link
              href="#pillars"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#3c4043] hover:bg-[#f1f3f4]"
            >
              Focus Areas
            </Link>
            <Link
              href="#events"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#3c4043] hover:bg-[#f1f3f4]"
            >
              Events &amp; Labs
            </Link>
            <Link
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#3c4043] hover:bg-[#f1f3f4]"
            >
              Team
            </Link>
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1a73e8] hover:bg-[#e8f0fe]"
            >
              Admin Portal
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#1a73e8] py-2.5 text-sm font-medium text-white shadow-sm"
            >
              <span>Join community</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export { Header };
