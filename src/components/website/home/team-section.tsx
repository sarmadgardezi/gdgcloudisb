import React from "react";

interface TeamSectionProps {
  communityUrl?: string;
}

const ORGANIZERS = [
  {
    name: "Irum Zahra",
    role: "Co-Manager",
    chapter: "GDG Cloud Islamabad",
    subtitle: "Data Scientist & Women Techmakers Ambassador",
    initials: "IZ",
    color: "#4285F4",
    bgTint: "#e8f0fe",
  },
  {
    name: "Ershian Anwar",
    role: "Co-Manager",
    chapter: "GDG Cloud Islamabad",
    subtitle: "Product Manager & Community Builder",
    initials: "EA",
    color: "#EA4335",
    bgTint: "#fce8e6",
  },
  {
    name: "Sarmad Gardezi",
    role: "Lead",
    chapter: "Social Media & PR",
    subtitle: "Developer & Chapter Advocate",
    initials: "SG",
    color: "#34A853",
    bgTint: "#e6f4ea",
  },
  {
    name: "Abdul Ahad Mehmood",
    role: "Lead",
    chapter: "Sponsorships & Outreach",
    subtitle: "Partnerships & Events Coordinator",
    initials: "AA",
    color: "#F9AB00",
    bgTint: "#fef7e0",
  },
];

export default function TeamSection({
  communityUrl = "https://gdg.community.dev/gdg-cloud-islamabad/",
}: TeamSectionProps) {
  return (
    <section id="team" className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#fbbc04]">
              Meet the Team
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#202124]">
              Say hello to our chapter organizers
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#5f6368]">
            We’re a volunteer crew who love bringing people together. Spot us at our next meetup and come say hi!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {ORGANIZERS.map((member) => (
            <div
              key={member.name}
              className="google-card p-6 flex flex-col items-start group"
            >
              {/* Member Avatar / Initials */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mb-4 border border-[#dadce0] transition-transform duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: member.bgTint,
                  color: member.color,
                }}
              >
                {member.initials}
              </div>

              <h3 className="text-lg font-semibold text-[#202124]">
                {member.name}
              </h3>

              <div
                className="mt-1 text-xs font-semibold"
                style={{ color: member.color }}
              >
                {member.role} • {member.chapter}
              </div>

              <p className="mt-2 text-xs text-[#5f6368] leading-relaxed">
                {member.subtitle}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={communityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-5 py-2.5 text-sm font-medium text-[#1a73e8] hover:bg-[#f8f9fa] hover:border-[#bdc1c6] transition-colors"
          >
            <span>Meet the rest of our volunteers &amp; speakers</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
