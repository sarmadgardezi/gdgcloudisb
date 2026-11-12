import React from "react";

const STATS = [
  {
    value: "2,900+",
    label: "Friendly Members",
    sublabel: "From curious students to seasoned engineers across the Twin Cities",
    accent: "#4285F4",
  },
  {
    value: "40+",
    label: "Meetups & Workshops",
    sublabel: "Hands-on coding sessions—no prior cloud experience needed",
    accent: "#EA4335",
  },
  {
    value: "50+",
    label: "Helpful Mentors",
    sublabel: "Googlers and local tech leaders sharing real-world tips",
    accent: "#FBBC04",
  },
  {
    value: "100%",
    label: "Free & Welcoming",
    sublabel: "Every event is free, open, and beginner-friendly from day one",
    accent: "#34A853",
  },
];

export default function Stats() {
  return (
    <section className="w-full bg-[#f8f9fa] py-12 sm:py-16 border-b border-[#dadce0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="google-card p-6 bg-white relative overflow-hidden"
            >
              {/* Google Brand Top Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: stat.accent }}
              />

              <div
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ color: stat.accent }}
              >
                {stat.value}
              </div>

              <div className="mt-2 text-base font-semibold text-[#202124]">
                {stat.label}
              </div>

              <p className="mt-1 text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
