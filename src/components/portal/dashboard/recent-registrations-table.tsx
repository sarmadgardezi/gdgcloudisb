import React from "react";
import Link from "next/link";
import { PortalRegistration } from "@/lib/portal-data";

interface RecentRegistrationsTableProps {
  registrations: PortalRegistration[];
}

export default function RecentRegistrationsTable({
  registrations,
}: RecentRegistrationsTableProps) {
  const getStatusBadge = (status: PortalRegistration["status"]) => {
    switch (status) {
      case "Checked In":
        return "bg-[#e6f4ea] text-[#137333] border-[#ceead6]";
      case "Confirmed":
        return "bg-[#e8f0fe] text-[#1a73e8] border-[#d2e3fc]";
      case "Waitlist":
        return "bg-[#fef7e0] text-[#b06000] border-[#fde293]";
      default:
        return "bg-[#f1f3f4] text-[#5f6368] border-[#dadce0]";
    }
  };

  return (
    <div className="google-card bg-white overflow-hidden">
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f1f3f4]">
        <div>
          <h3 className="text-lg font-semibold text-[#202124]">
            Recent Registrations
          </h3>
          <p className="text-xs text-[#5f6368] mt-0.5">
            Real-time feed of attendees signing up for GDG Cloud Islamabad events
          </p>
        </div>

        <Link
          href="/portal/registrations"
          className="text-xs font-semibold text-[#1a73e8] hover:underline self-start sm:self-auto flex items-center gap-1"
        >
          <span>View all registrations</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#f8f9fa] border-b border-[#dadce0] text-[#5f6368] font-medium">
              <th className="py-3 px-4 sm:px-6">Attendee</th>
              <th className="py-3 px-4 hidden md:table-cell">Event</th>
              <th className="py-3 px-4 hidden sm:table-cell">Ticket</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4 text-right sm:px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f3f4]">
            {registrations.slice(0, 6).map((reg) => (
              <tr key={reg.id} className="hover:bg-[#f8f9fa] transition-colors">
                {/* Attendee Info */}
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-2xs"
                      style={{ backgroundColor: reg.avatarBg }}
                    >
                      {reg.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-[#202124] truncate">
                        {reg.userName}
                      </div>
                      <div className="text-xs text-[#5f6368] truncate">
                        {reg.userEmail}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Event */}
                <td className="py-3.5 px-4 hidden md:table-cell text-[#3c4043] font-medium">
                  {reg.eventTitle}
                </td>

                {/* Ticket */}
                <td className="py-3.5 px-4 hidden sm:table-cell text-[#5f6368]">
                  <span className="rounded-md bg-[#f1f3f4] px-2 py-0.5 text-xs text-[#3c4043]">
                    {reg.ticketType}
                  </span>
                </td>

                {/* Time */}
                <td className="py-3.5 px-4 text-[#5f6368] whitespace-nowrap">
                  {reg.registeredAt}
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                      reg.status
                    )}`}
                  >
                    {reg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

