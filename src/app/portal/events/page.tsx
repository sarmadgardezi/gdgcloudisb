"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { INITIAL_EVENTS, PortalEvent } from "@/lib/portal-data";

export default function PortalEventsPage() {
  const [events, setEvents] = useState<PortalEvent[]>(INITIAL_EVENTS);
  const [filter, setFilter] = useState<"all" | "Active" | "Upcoming" | "Completed">("all");

  const filteredEvents = events.filter((e) => {
    if (filter === "all") return true;
    return e.status === filter;
  });

  const handleAddNewEvent = () => {
    const title = prompt("Enter event title:");
    if (!title) return;
    const category = prompt("Enter category (e.g., Hands-on Lab, Conference):") || "Community Workshop";
    const date = prompt("Enter date & time (e.g., 20 August 2026 • 3:00 PM PKT):") || "Upcoming • TBD";
    const capacity = parseInt(prompt("Enter total seating capacity:") || "100", 10);

    const newEvt: PortalEvent = {
      id: `evt-${Date.now()}`,
      title,
      category,
      date,
      location: "Islamabad • On-site",
      totalCapacity: capacity || 100,
      registeredCount: 0,
      checkedInCount: 0,
      status: "Upcoming",
      featured: false,
    };

    setEvents([newEvt, ...events]);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#5f6368] mb-1">
            <span>Portal</span>
            <span>/</span>
            <span className="text-[#202124] font-medium">Events</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
            Events &amp; Hands-on Labs
          </h1>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1">
            Manage upcoming chapter meetups, track RSVPs, and review attendance
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNewEvent}
          className="inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#1557d0] transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <span>+ Create New Event</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#dadce0] pb-2 text-xs sm:text-sm font-medium">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            filter === "all"
              ? "bg-[#e8f0fe] text-[#1a73e8] font-semibold"
              : "text-[#5f6368] hover:text-[#202124]"
          }`}
        >
          All Events ({events.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter("Active")}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            filter === "Active"
              ? "bg-[#e8f0fe] text-[#1a73e8] font-semibold"
              : "text-[#5f6368] hover:text-[#202124]"
          }`}
        >
          Active Registration
        </button>
        <button
          type="button"
          onClick={() => setFilter("Upcoming")}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            filter === "Upcoming"
              ? "bg-[#e8f0fe] text-[#1a73e8] font-semibold"
              : "text-[#5f6368] hover:text-[#202124]"
          }`}
        >
          Upcoming
        </button>
        <button
          type="button"
          onClick={() => setFilter("Completed")}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            filter === "Completed"
              ? "bg-[#e8f0fe] text-[#1a73e8] font-semibold"
              : "text-[#5f6368] hover:text-[#202124]"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEvents.map((evt) => {
          const percentage = Math.round((evt.registeredCount / evt.totalCapacity) * 100);

          return (
            <div
              key={evt.id}
              className="google-card bg-white p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                {/* Media frame if available */}
                {evt.image && (
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 border border-[#dadce0]">
                    <Image
                      src={evt.image}
                      alt={evt.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">
                    {evt.category}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      evt.status === "Active"
                        ? "bg-[#fce8e6] text-[#c5221f] border-[#f5c2c7]"
                        : evt.status === "Upcoming"
                        ? "bg-[#e6f4ea] text-[#137333] border-[#ceead6]"
                        : "bg-[#f1f3f4] text-[#5f6368] border-[#dadce0]"
                    }`}
                  >
                    {evt.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#202124]">{evt.title}</h3>

                <div className="mt-3 space-y-1.5 text-xs text-[#5f6368]">
                  <div className="flex items-center gap-1.5">
                    <span>📅</span>
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>📍</span>
                    <span>{evt.location}</span>
                  </div>
                </div>

                {/* Registration bar */}
                <div className="mt-4 pt-4 border-t border-[#f1f3f4]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-[#202124]">
                      {evt.registeredCount} / {evt.totalCapacity} Registered
                    </span>
                    <span className="font-semibold text-[#1a73e8]">{percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#e8eaed] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1a73e8] rounded-full"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#f1f3f4] flex items-center justify-between">
                <Link
                  href="/portal/registrations"
                  className="text-xs font-semibold text-[#1a73e8] hover:underline"
                >
                  Manage Registrations →
                </Link>
                <span className="text-[11px] text-[#5f6368]">
                  Checked-in: {evt.checkedInCount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

