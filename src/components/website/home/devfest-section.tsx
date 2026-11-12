"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createRegistration, DevFestRegistrationInput } from "@/lib/db";

const TRACKS = [
  "Gemini & Generative AI",
  "Cloud Architecture & GKE",
  "DevOps, SRE & Observability",
  "Web, Mobile & Firebase",
];

const ROLES = [
  "Software Engineer",
  "University / College Student",
  "Cloud / DevOps Architect",
  "Data Scientist / AI Engineer",
  "Product Manager / Tech Lead",
  "Founder / Entrepreneur",
  "Other",
];

export default function DevFestSection() {
  const [formData, setFormData] = useState<DevFestRegistrationInput>({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    role: "Software Engineer",
    track: "Gemini & Generative AI",
    experienceLevel: "Beginner",
  });

  const [loading, setLoading] = useState(false);
  const [registeredTicket, setRegisteredTicket] = useState<{
    id: string;
    name: string;
    email: string;
    track: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.organization.trim()) {
      setErrorMessage("Please enter your company, startup, or university.");
      return;
    }

    setLoading(true);
    try {
      const res = await createRegistration({
        ...formData,
        eventId: "devfest-islamabad-2026",
        eventTitle: "Cloud DevFest Islamabad 2026",
      });

      if (res.success) {
        setRegisteredTicket({
          id: res.registrationId,
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          track: formData.track,
        });
      } else {
        setErrorMessage(res.error || "Unable to complete registration. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again in a few moments.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="devfest" className="relative w-full bg-white py-16 sm:py-24 border-b border-[#dadce0] overflow-hidden">
      {/* Background Google Color Accent Bars */}
      <div className="absolute top-0 left-0 right-0 h-1 grid grid-cols-4">
        <div className="bg-[#4285F4]" />
        <div className="bg-[#EA4335]" />
        <div className="bg-[#FBBC04]" />
        <div className="bg-[#34A853]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-[#f8f9fa] px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#1a73e8] mb-4 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-[#ea4335] animate-ping" />
            <span>🎉 Flagship Event • Registration Now Live</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#202124] leading-tight">
            Cloud DevFest Islamabad 2026
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#5f6368] leading-relaxed">
            Join 600+ developers, engineers, and tech leaders across the Twin Cities for our biggest gathering of the year. Featuring deep-dive Google Cloud sessions, Gemini AI labs, and expert keynotes.
          </p>

          {/* Quick Event Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium text-[#3c4043]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f3f4] px-4 py-1.5 border border-[#dadce0]">
              <span>📅</span> 18 October 2026 • 9:00 AM PKT
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f3f4] px-4 py-1.5 border border-[#dadce0]">
              <span>📍</span> Convention Center, Islamabad
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f4ea] text-[#137333] px-4 py-1.5 border border-[#ceead6]">
              <span>🎟️</span> 100% Free Admission
            </span>
          </div>
        </div>

        {/* 2-Column Grid: Left Event Perks, Right Registration Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: What's in Store */}
          <div className="lg:col-span-5 space-y-6">
            <div className="google-card p-6 sm:p-7 bg-[#f8f9fa] space-y-5">
              <h3 className="text-xl font-bold text-[#202124]">
                What to expect at DevFest
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] text-[#1a73e8] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#202124]">
                      Keynotes from Googlers &amp; GDEs
                    </h4>
                    <p className="text-xs text-[#5f6368] mt-0.5 leading-relaxed">
                      Hear firsthand about Google Cloud Next announcements, generative AI, and real production architectures.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#fce8e6] text-[#ea4335] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#202124]">
                      Hands-on Code Labs &amp; Swag
                    </h4>
                    <p className="text-xs text-[#5f6368] mt-0.5 leading-relaxed">
                      Guided workshops with free Cloud Skills Boost credits, official Google Developer shirts, stickers, and goodies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#fef7e0] text-[#b06000] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#202124]">
                      4 Focused Technical Tracks
                    </h4>
                    <p className="text-xs text-[#5f6368] mt-0.5 leading-relaxed">
                      Choose between Cloud Infrastructure, Generative AI &amp; Gemini, DevOps / SRE, or Beginner Jumpstart.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#e6f4ea] text-[#137333] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#202124]">
                      Networking Lunch &amp; Job Fair
                    </h4>
                    <p className="text-xs text-[#5f6368] mt-0.5 leading-relaxed">
                      Meet local tech employers, startup founders, and talented developers across the Twin Cities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Live DB Sync Indicator */}
            <div className="p-4 rounded-xl border border-[#dadce0] bg-white flex items-center justify-between text-xs text-[#5f6368]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                <span className="font-medium text-[#202124]">Direct Database Sync</span>
              </div>
              <span className="text-[#1a73e8] font-mono">Firebase Firestore Active</span>
            </div>
          </div>

          {/* Right Column: Registration Form or Success Ticket */}
          <div className="lg:col-span-7">
            {registeredTicket ? (
              /* Success Digital Pass Card */
              <div className="google-card p-8 sm:p-10 bg-white border-2 border-[#34A853] text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#e6f4ea] text-[#137333] mx-auto flex items-center justify-center text-3xl shadow-sm">
                  🎉
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f4ea] text-[#137333] px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2">
                    ✓ Registration Confirmed
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#202124]">
                    You&apos;re attending Cloud DevFest 2026!
                  </h3>
                  <p className="mt-2 text-sm text-[#5f6368]">
                    We&apos;re so excited to see you in Islamabad! Your spot has been recorded in our official database.
                  </p>
                </div>

                {/* Digital Ticket Box */}
                <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] text-left space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center border-b border-[#e8eaed] pb-2">
                    <span className="text-[#5f6368]">PASS ID</span>
                    <span className="text-[#1a73e8] font-bold">{registeredTicket.id}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#e8eaed] pb-2">
                    <span className="text-[#5f6368]">ATTENDEE</span>
                    <span className="text-[#202124] font-bold">{registeredTicket.name}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#e8eaed] pb-2">
                    <span className="text-[#5f6368]">EMAIL</span>
                    <span className="text-[#202124] truncate max-w-[200px]">{registeredTicket.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5f6368]">TRACK</span>
                    <span className="text-[#137333] font-bold">{registeredTicket.track}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/portal/registrations"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1a73e8] px-6 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-[#1557d0] transition-colors"
                  >
                    <span>View in Admin Portal</span>
                    <span aria-hidden="true">→</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setRegisteredTicket(null);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        organization: "",
                        role: "Software Engineer",
                        track: "Gemini & Generative AI",
                        experienceLevel: "Beginner",
                      });
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#dadce0] px-5 py-2.5 text-xs sm:text-sm font-medium text-[#3c4043] hover:bg-[#f8f9fa] transition-colors"
                  >
                    <span>Register Another Attendee</span>
                  </button>
                </div>
              </div>
            ) : (
              /* The Real Registration Form */
              <div className="google-card p-6 sm:p-8 bg-white shadow-sm border border-[#dadce0]">
                <div className="border-b border-[#f1f3f4] pb-4 mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#202124]">
                    Reserve Your DevFest Seat (Free)
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#5f6368]">
                    Fill in your details below to secure your entry pass. Submissions sync directly to our live database.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-5 p-3 rounded-xl bg-[#fce8e6] border border-[#f5c2c7] text-[#c5221f] text-xs sm:text-sm flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="devfest-name" className="block text-xs font-semibold text-[#202124] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="devfest-name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ali Hamza"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] text-sm text-[#202124] placeholder-[#80868b] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="devfest-email" className="block text-xs font-semibold text-[#202124] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="devfest-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ali.hamza@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] text-sm text-[#202124] placeholder-[#80868b] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="devfest-phone" className="block text-xs font-semibold text-[#202124] mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        id="devfest-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] text-sm text-[#202124] placeholder-[#80868b] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="devfest-org" className="block text-xs font-semibold text-[#202124] mb-1.5">
                        Company / University *
                      </label>
                      <input
                        id="devfest-org"
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. NUST / Systems Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] text-sm text-[#202124] placeholder-[#80868b] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Role & Track selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="devfest-role" className="block text-xs font-semibold text-[#202124] mb-1.5">
                        Current Role / Profession
                      </label>
                      <select
                        id="devfest-role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#dadce0] text-sm text-[#202124] bg-white focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none cursor-pointer"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="devfest-track" className="block text-xs font-semibold text-[#202124] mb-1.5">
                        Preferred Learning Track
                      </label>
                      <select
                        id="devfest-track"
                        value={formData.track}
                        onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#dadce0] text-sm text-[#202124] bg-white focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none cursor-pointer"
                      >
                        {TRACKS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-xs font-semibold text-[#202124] mb-2">
                      Experience with Google Cloud &amp; AI
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Beginner / Curious", "Intermediate (1-2 yrs)", "Production Expert"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setFormData({ ...formData, experienceLevel: lvl })}
                          className={`py-2 px-2 text-center rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                            formData.experienceLevel === lvl
                              ? "border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8] font-semibold"
                              : "border-[#dadce0] text-[#5f6368] hover:bg-[#f8f9fa]"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-full bg-[#1a73e8] hover:bg-[#1557d0] active:scale-[0.99] text-white text-[15px] font-medium shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Connecting to Database &amp; Registering…</span>
                        </>
                      ) : (
                        <span>Complete DevFest Registration (Free) →</span>
                      )}
                    </button>
                    <p className="mt-2 text-center text-[11px] text-[#5f6368]">
                      Free entry for all registered developers. Confirmation is sent to your email.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

