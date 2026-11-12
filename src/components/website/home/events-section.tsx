import React from "react";
import Image from "next/image";

interface EventsSectionProps {
  communityUrl?: string;
}

const EVENT_SERIES = [
  {
    badge: "Featured Event",
    badgeColor: "#EA4335",
    badgeBg: "#fce8e6",
    date: "Islamabad Chapter",
    title: "Workshop with Googlers • Cloud Next",
    description:
      "An afternoon of relaxed learning, live Q&A, and friendly networking with visiting Googlers and local tech leaders.",
    topics: ["Google Cloud Next", "AI & Data", "Live Q&A"],
    image: "/image/raw/509268537_1245814630888240_9045050149244473425_n.jpg",
    imageAlt: "Workshop with Googlers - GDG Cloud Islamabad",
  },
  {
    badge: "Annual Celebration",
    badgeColor: "#4285F4",
    badgeBg: "#e8f0fe",
    date: "Once a Year",
    title: "Cloud DevFest Islamabad",
    description:
      "Our biggest yearly meetup! A full day of inspiring talks, cool demos, swag, and connecting with developers from all over town.",
    topics: ["Cloud Basics", "DevOps", "Community Fun"],
  },
  {
    badge: "Hands-on Labs",
    badgeColor: "#34A853",
    badgeBg: "#e6f4ea",
    date: "Beginner Friendly",
    title: "Build with AI & Gemini Labs",
    description:
      "Friendly co-working sessions where you can experiment with Gemini, Google AI Studio, and turn your creative ideas into real apps.",
    topics: ["Gemini API", "Google AI Studio", "Easy AI Apps"],
  },
  {
    badge: "Starter Track",
    badgeColor: "#F9AB00",
    badgeBg: "#fef7e0",
    date: "Open to All",
    title: "Google Cloud LiftOff & I/O Extended",
    description:
      "Easy-to-follow sessions covering cloud fundamentals, Firebase, plus local Google I/O watch parties to see what’s new.",
    topics: ["Cloud Run", "Firebase", "Watch Parties"],
  },
];

export default function EventsSection({
  communityUrl = "https://gdg.community.dev/gdg-cloud-islamabad/",
}: EventsSectionProps) {
  return (
    <section
      id="events"
      className="w-full bg-[#f8f9fa] py-16 sm:py-20 border-y border-[#dadce0]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#34a853]">
              Events &amp; Meetups
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#202124]">
              Come hang out at our next event
            </h2>
          </div>

          <a
            href={communityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1a73e8] hover:text-[#1557d0] transition-colors"
          >
            <span>See all events on gdg.community.dev</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENT_SERIES.map((event) => (
            <article
              key={event.title}
              className="google-card bg-white overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image or Clean Visual Frame (ready for event photos) */}
                <div className="relative h-52 sm:h-56 w-full bg-[#f1f3f4] border-b border-[#dadce0] overflow-hidden">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.imageAlt || event.title}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center google-grid-pattern bg-white">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm border border-[#dadce0]"
                        style={{ backgroundColor: event.badgeBg, color: event.badgeColor }}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-[#5f6368]">
                        {event.title} • Event Photo Coming Soon
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        color: event.badgeColor,
                        backgroundColor: event.badgeBg,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: event.badgeColor }}
                      />
                      {event.badge}
                    </span>

                    <span className="text-xs font-medium text-[#5f6368]">
                      {event.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#202124] group-hover:text-[#1a73e8] transition-colors">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#5f6368]">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-[#f1f3f4] flex flex-wrap gap-2">
                {event.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-md bg-[#f1f3f4] px-2.5 py-1 text-xs font-medium text-[#3c4043]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
