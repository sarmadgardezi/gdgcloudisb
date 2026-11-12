"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PortalHeaderProps {
  onToggleSidebar?: () => void;
}

export default function PortalHeader({ onToggleSidebar }: PortalHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#dadce0]">
      {/* 4-Color Google Brand Stripe */}
      <div className="grid grid-cols-4 h-[3px] w-full">
        <div className="bg-[#4285F4]" />
        <div className="bg-[#EA4335]" />
        <div className="bg-[#FBBC04]" />
        <div className="bg-[#34A853]" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Hamburger + Logo + Chapter selector */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-[#5f6368] hover:bg-[#f1f3f4] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/portal" className="flex items-center gap-3">
            <Image
              src="/image/raw/Left-Aligned-Logo.png"
              alt="GDG Cloud Islamabad"
              width={160}
              height={32}
              priority
              className="h-7 w-auto object-contain hidden sm:block"
            />
            <span className="hidden sm:inline-block text-[#dadce0]">|</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f0fe] px-3 py-1 text-xs font-semibold text-[#1a73e8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8]" />
              Admin Portal
            </span>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#80868b]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search registrations, events, users..."
              className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm rounded-full bg-[#f1f3f4] border border-transparent focus:bg-white focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all placeholder-[#80868b]"
            />
          </div>
        </div>

        {/* Right: Quick Actions + User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#5f6368] hover:text-[#1a73e8] px-3 py-1.5 rounded-lg hover:bg-[#f1f3f4] transition-colors"
          >
            <span>Live Website</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          {/* User Profile Pill & Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-[#f1f3f4] transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                SG
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight pr-1">
                <div className="font-semibold text-[#202124]">Sarmad Gardezi</div>
                <div className="text-[11px] text-[#5f6368]">Chapter Admin</div>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#dadce0] rounded-xl shadow-lg py-1.5 z-50 text-xs">
                <div className="px-4 py-2 border-b border-[#f1f3f4]">
                  <p className="font-semibold text-[#202124]">Sarmad Gardezi</p>
                  <p className="text-[#5f6368] truncate">sarmad.gardezi@gdgcloud.pk</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-[#188038] bg-[#e6f4ea] px-2 py-0.5 rounded-full">
                    Admin Access
                  </span>
                </div>
                <Link
                  href="/portal/users"
                  onClick={() => setShowUserMenu(false)}
                  className="block px-4 py-2 text-[#3c4043] hover:bg-[#f1f3f4]"
                >
                  Manage Users &amp; Roles
                </Link>
                <Link
                  href="/portal/registrations"
                  onClick={() => setShowUserMenu(false)}
                  className="block px-4 py-2 text-[#3c4043] hover:bg-[#f1f3f4]"
                >
                  Registrations Console
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-[#3c4043] hover:bg-[#f1f3f4]"
                >
                  Back to Public Website
                </Link>
                <div className="border-t border-[#f1f3f4] my-1" />
                <Link
                  href="/login"
                  className="block px-4 py-2 text-[#c5221f] hover:bg-[#fce8e6]"
                >
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

