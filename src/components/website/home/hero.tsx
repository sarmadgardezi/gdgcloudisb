"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface HeroProps {
  communityUrl?: string;
}

export default function Hero({}: HeroProps) {
  const markRef = useRef<SVGSVGElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!markRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      markRef.current.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText("gdg join --chapter=cloud-islamabad");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="relative w-full bg-white border-b border-[#dadce0] overflow-hidden">
      {/* Subtle Google-style background grid */}
      <div className="absolute inset-0 google-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Friendly Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-[#f8f9fa] px-4 py-1.5 text-xs sm:text-sm font-medium text-[#3c4043] shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#34a853]" />
              <span>👋 Welcome to Google Developer Group • Islamabad</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-[#202124] leading-[1.1]">
              Learn, build, and grow with{" "}
              <span className="inline-block whitespace-nowrap">
                <span className="text-[#4285f4]">G</span>
                <span className="text-[#ea4335]">o</span>
                <span className="text-[#fbbc04]">o</span>
                <span className="text-[#4285f4]">g</span>
                <span className="text-[#34a853]">l</span>
                <span className="text-[#ea4335]">e</span>
              </span>{" "}
              Cloud in Islamabad.
            </h1>

            {/* Friendly Subtitle */}
            <p className="mt-5 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-[#5f6368]">
              We’re a friendly community of developers, students, and tech enthusiasts across Islamabad and Rawalpindi. Whether you’re writing your very first lines of code, exploring Gemini AI, or building cloud systems, you have a warm seat here.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-7 py-3 text-[15px] font-medium text-white shadow-sm transition-all duration-150 hover:bg-[#1557d0] hover:shadow active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Join our friendly community</span>
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

              <a
                href="https://cloud.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dadce0] bg-white px-6 py-3 text-[15px] font-medium text-[#1a73e8] transition-all duration-150 hover:bg-[#f8f9fa] hover:border-[#bdc1c6] w-full sm:w-auto"
              >
                <span>Explore Google Cloud</span>
              </a>

              <Link
                href="#events"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-[14px] font-medium text-[#5f6368] hover:text-[#202124] transition-colors"
              >
                <span>See upcoming meetups</span>
                <span aria-hidden="true">↓</span>
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-8 pt-6 border-t border-[#e8eaed] flex flex-wrap items-center gap-5 sm:gap-6 text-xs sm:text-sm text-[#5f6368]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#202124]">🤝 2,900+</span>
                <span>Builders</span>
              </div>
              <span className="text-[#dadce0]">•</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#202124]">💡 40+</span>
                <span>Hands-on Labs</span>
              </div>
              <span className="text-[#dadce0]">•</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#34a853]">☕ 100% Free</span>
                <span>Always Open</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive GDG Code Bracket Visual & Clean Terminal */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Visual Container Card */}
            <div className="w-full max-w-[440px] rounded-2xl border border-[#dadce0] bg-white p-6 sm:p-8 shadow-sm">
              {/* Official 3D Tilt Code Brackets */}
              <div className="flex items-center justify-center py-4">
                <svg
                  ref={markRef}
                  className="w-56 h-auto overflow-visible transition-transform duration-150 ease-out"
                  viewBox="0 0 220 120"
                  role="img"
                  aria-label="Google Developer Group Code Brackets"
                >
                  {/* Left Bracket < */}
                  <g className="animate-float-mark" style={{ animationDelay: "0s" }}>
                    <rect
                      x="35"
                      y="21"
                      width="72"
                      height="34"
                      rx="17"
                      fill="#ea4335"
                      transform="rotate(-35 71 38)"
                    />
                  </g>
                  <g className="animate-float-mark" style={{ animationDelay: "0.4s" }}>
                    <rect
                      x="35"
                      y="65"
                      width="72"
                      height="34"
                      rx="17"
                      fill="#4285f4"
                      transform="rotate(35 71 82)"
                    />
                  </g>

                  {/* Right Bracket > */}
                  <g className="animate-float-mark" style={{ animationDelay: "0.8s" }}>
                    <rect
                      x="113"
                      y="21"
                      width="72"
                      height="34"
                      rx="17"
                      fill="#34a853"
                      transform="rotate(35 149 38)"
                    />
                  </g>
                  <g className="animate-float-mark" style={{ animationDelay: "1.2s" }}>
                    <rect
                      x="113"
                      y="65"
                      width="72"
                      height="34"
                      rx="17"
                      fill="#fbbc04"
                      transform="rotate(-35 149 82)"
                    />
                  </g>
                </svg>
              </div>

              {/* Minimal Clean Developer Terminal Box */}
              <div className="mt-4 rounded-xl border border-[#dadce0] bg-[#f8f9fa] overflow-hidden text-xs sm:text-[13px] font-mono text-[#202124]">
                <div className="flex items-center justify-between px-3.5 py-2 border-b border-[#dadce0] bg-[#f1f3f4]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ea4335]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#fbbc04]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#34a853]" />
                  </div>
                  <span className="text-[11px] text-[#5f6368]">cloud-isb ~ bash</span>
                  <button
                    type="button"
                    onClick={handleCopyCommand}
                    className="text-[11px] font-medium text-[#1a73e8] hover:underline cursor-pointer"
                  >
                    {copied ? "Copied! 🎉" : "Copy"}
                  </button>
                </div>

                <div className="p-3.5 leading-relaxed">
                  <div className="text-[#1a73e8]">
                    $ gdg join <span className="text-[#188038]">--chapter</span>=
                    <span className="text-[#b06000]">cloud-islamabad</span>
                  </div>
                  <div className="text-[#5f6368] mt-1.5">
                    <span className="text-[#188038]">✓</span> You&apos;re in! Welcome to the family
                  </div>
                  <div className="text-[#5f6368]">
                    <span className="text-[#188038]">✓</span> Meet 2,900+ builders in Islamabad
                  </div>
                  <div className="text-[#5f6368]">
                    <span className="text-[#188038]">✓</span> Free workshops, warm coffee &amp; great talks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
