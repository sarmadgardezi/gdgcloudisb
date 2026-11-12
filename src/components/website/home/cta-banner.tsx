import React from "react";
import Link from "next/link";

interface CtaBannerProps {
  communityUrl?: string;
}

export default function CtaBanner({}: CtaBannerProps) {
  return (
    <section className="w-full bg-[#f8f9fa] py-16 sm:py-24 border-t border-[#dadce0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="google-card relative bg-white p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
          {/* 4-Color Google Brand Top Line */}
          <div className="grid grid-cols-4 h-1 absolute top-0 left-0 right-0">
            <div className="bg-[#4285F4]" />
            <div className="bg-[#EA4335]" />
            <div className="bg-[#FBBC04]" />
            <div className="bg-[#34A853]" />
          </div>

          <div className="max-w-2xl mx-auto flex flex-col items-center pt-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e6f4ea] text-[#137333] px-3.5 py-1 text-xs font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-[#34a853]" />
              Always Free &amp; Open to Everyone
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#202124]">
              Come build with us in Islamabad!
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#5f6368] leading-relaxed">
              Join thousands of friendly developers, students, and builders across Islamabad &amp; Rawalpindi. RSVP to our next meetup and start learning together today.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-8 py-3.5 text-base font-medium text-white shadow-sm transition-all duration-150 hover:bg-[#1557d0] hover:shadow active:scale-[0.98]"
              >
                <span>Join GDG Cloud Islamabad (Free)</span>
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
                href="https://cloud.google.com/innovators"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-6 py-3.5 text-base font-medium text-[#1a73e8] hover:bg-[#f8f9fa] hover:border-[#bdc1c6] transition-all duration-150"
              >
                <span>Google Cloud Innovators</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
