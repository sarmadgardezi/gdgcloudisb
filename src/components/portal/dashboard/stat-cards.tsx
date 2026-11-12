import React from "react";

interface StatCardsProps {
  totalRegistrations?: number;
  newRegistrations?: number;
  activeEventAttendees?: number;
  adminCount?: number;
}

export default function StatCards({
  totalRegistrations = 3420,
  newRegistrations = 248,
  activeEventAttendees = 185,
  adminCount = 6,
}: StatCardsProps) {
  const STATS = [
    {
      title: "Total Registrations",
      value: totalRegistrations.toLocaleString(),
      change: "+14.2% all-time",
      changeType: "positive",
      sublabel: "Across all chapter workshops & DevFests",
      accent: "#4285F4", // Google Blue
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      title: "New Registrations",
      value: `+${newRegistrations}`,
      change: "+28.4% this week",
      changeType: "positive",
      sublabel: "New attendees joined in the last 7 days",
      accent: "#34A853", // Google Green
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "This Event Registered",
      value: `${activeEventAttendees} / 200`,
      change: "92.5% full",
      changeType: "neutral",
      sublabel: "Workshop with Googlers • Cloud Next",
      accent: "#EA4335", // Google Red
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
        </svg>
      ),
    },
    {
      title: "Admin & Lead Accounts",
      value: `${adminCount} Admins`,
      change: "Chapter Leads",
      changeType: "neutral",
      sublabel: "Organizers with full portal access",
      accent: "#FBBC04", // Google Yellow
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {STATS.map((stat) => (
        <div
          key={stat.title}
          className="google-card p-5 sm:p-6 bg-white relative overflow-hidden flex flex-col justify-between"
        >
          {/* Google Color Top Accent Bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: stat.accent }}
          />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#5f6368]">{stat.title}</span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `color-mix(in srgb, ${stat.accent} 15%, transparent)`,
                  color: stat.accent,
                }}
              >
                {stat.icon}
              </div>
            </div>

            <div
              className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ color: "#202124" }}
            >
              {stat.value}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#f1f3f4] flex items-center justify-between text-xs">
            <span className="text-[#5f6368] truncate">{stat.sublabel}</span>
            <span
              className={`font-semibold shrink-0 ml-2 ${
                stat.changeType === "positive"
                  ? "text-[#188038]"
                  : "text-[#1a73e8]"
              }`}
            >
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

