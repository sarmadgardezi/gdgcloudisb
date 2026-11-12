import React from "react";

const PILLARS = [
  {
    title: "Inspiring Tech Talks",
    description:
      "Hear real stories and easy-to-follow tips from engineers building everyday apps and products on Google Cloud.",
    color: "#4285F4",
    bgTint: "#e8f0fe",
    tag: "Beginner Friendly",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: "Hands-on Workshops",
    description:
      "Open your laptop and code along! Guided labs where mentors help you step-by-step—questions and mistakes are always welcome.",
    color: "#EA4335",
    bgTint: "#fce8e6",
    tag: "Step-by-Step Labs",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Friendly Study Groups",
    description:
      "Studying is way more fun with friends. Team up to prep for Google Cloud certifications and earn skill badges together.",
    color: "#F9AB00",
    bgTint: "#fef7e0",
    tag: "Learn Together",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Meetups & Coffee",
    description:
      "Hang out, swap ideas, grab a cup of chai, and make great friends in the Islamabad and Rawalpindi tech community.",
    color: "#34A853",
    bgTint: "#e6f4ea",
    tag: "Make Connections",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.94-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

export default function FocusPillars() {
  return (
    <section id="pillars" className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1a73e8]">
              What We Do Together
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#202124]">
              There’s something here for everyone
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#5f6368]">
            You don’t need to be a cloud expert to join. Just bring your curiosity, your questions, and a smile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="google-card p-6 flex flex-col justify-between group"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105"
                  style={{
                    backgroundColor: pillar.bgTint,
                    color: pillar.color,
                  }}
                >
                  {pillar.icon}
                </div>

                <h3 className="text-lg font-semibold text-[#202124]">
                  {pillar.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#5f6368]">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f1f3f4] flex items-center justify-between">
                <span
                  className="text-xs font-semibold"
                  style={{ color: pillar.color }}
                >
                  {pillar.tag}
                </span>
                <span className="text-[#80868b] group-hover:translate-x-1 transition-transform text-sm">
                  →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
