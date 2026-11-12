import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortalEvent } from "@/lib/portal-data";

interface ActiveEventCardProps {
  event: PortalEvent;
}

export default function ActiveEventCard({ event }: ActiveEventCardProps) {
  const percentage = Math.round((event.registeredCount / event.totalCapacity) * 100);

  return (
    <div className="google-card p-6 sm:p-7 bg-white relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#f1f3f4]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fce8e6] text-[#c5221f] px-3 py-0.5 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#ea4335] animate-pulse" />
              Featured Active Event
            </span>
            <span className="text-xs text-[#5f6368] font-mono">ID: {event.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight">
            {event.title}
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/portal/registrations"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1a73e8] px-4 py-2 text-xs font-medium text-white hover:bg-[#1557d0] transition-colors shadow-2xs"
          >
            <span>Manage Attendees</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/portal/events"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#dadce0] px-4 py-2 text-xs font-medium text-[#3c4043] hover:bg-[#f8f9fa] transition-colors"
          >
            <span>Edit Event</span>
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Event Media Frame */}
        <div className="lg:col-span-4 relative h-48 sm:h-52 rounded-xl overflow-hidden border border-[#dadce0] bg-[#f1f3f4]">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-[#5f6368]">
              No Image Available
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-[#202124]/80 text-white text-[11px] px-2.5 py-1 rounded-md backdrop-blur-xs font-medium">
            Islamabad Chapter
          </div>
        </div>

        {/* Right: Key Stats & Progress */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#f8f9fa] border border-[#e8eaed]">
              <div className="text-xs text-[#5f6368]">Total Capacity</div>
              <div className="mt-1 text-xl font-bold text-[#202124]">
                {event.totalCapacity}{" "}
                <span className="text-xs font-normal text-[#5f6368]">Seats</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#e8f0fe] border border-[#d2e3fc]">
              <div className="text-xs font-medium text-[#1a73e8]">Registered</div>
              <div className="mt-1 text-xl font-bold text-[#1a73e8]">
                {event.registeredCount}{" "}
                <span className="text-xs font-normal text-[#1a73e8]">({percentage}%)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#e6f4ea] border border-[#ceead6]">
              <div className="text-xs font-medium text-[#137333]">Checked In</div>
              <div className="mt-1 text-xl font-bold text-[#137333]">
                {event.checkedInCount}{" "}
                <span className="text-xs font-normal text-[#137333]">Attendees</span>
              </div>
            </div>
          </div>

          {/* Registration Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-[#202124]">Registration Capacity Progress</span>
              <span className="font-semibold text-[#1a73e8]">
                {event.totalCapacity - event.registeredCount} seats remaining
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#e8eaed] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Event Meta Details */}
          <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#5f6368]">
            <div className="flex items-center gap-1.5">
              <span className="text-[#80868b]">📅</span>
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#80868b]">📍</span>
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#80868b]">🎟️</span>
              <span>Free Admission (Registration Required)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

