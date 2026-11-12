"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  getRegistrationsFromDb,
  updateRegistrationStatusInDb,
} from "@/lib/db";
import { INITIAL_REGISTRATIONS, PortalRegistration } from "@/lib/portal-data";

export default function PortalRegistrationsPage() {
  const [registrations, setRegistrations] = useState<PortalRegistration[]>(INITIAL_REGISTRATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch real registrations from Firestore on mount
  useEffect(() => {
    async function loadRegistrations() {
      try {
        const liveRegistrations = await getRegistrationsFromDb();
        if (liveRegistrations && liveRegistrations.length > 0) {
          setRegistrations(liveRegistrations);
        }
      } catch (e) {
        console.warn("Using initial registrations:", e);
      } finally {
        setLoading(false);
      }
    }
    loadRegistrations();
  }, []);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      if (statusFilter !== "all" && reg.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          reg.userName.toLowerCase().includes(q) ||
          reg.userEmail.toLowerCase().includes(q) ||
          reg.eventTitle.toLowerCase().includes(q) ||
          reg.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [registrations, statusFilter, searchQuery]);

  const toggleCheckIn = async (id: string) => {
    const target = registrations.find((r) => r.id === id);
    if (!target) return;

    const nextStatus = target.status === "Checked In" ? "Confirmed" : "Checked In";

    // Optimistic UI update
    setRegistrations((prev) =>
      prev.map((reg) => (reg.id === id ? { ...reg, status: nextStatus } : reg))
    );

    setToastMessage(
      nextStatus === "Checked In"
        ? `Checked in ${target.userName}!`
        : `Check-in reversed for ${target.userName}.`
    );
    setTimeout(() => setToastMessage(null), 2500);

    // Save to Firestore
    await updateRegistrationStatusInDb(id, nextStatus);
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Registration ID,Name,Email,Event,Ticket,Status,Time"].join(",") +
      "\n" +
      filteredRegistrations
        .map(
          (r) =>
            `"${r.id}","${r.userName}","${r.userEmail}","${r.eventTitle}","${r.ticketType}","${r.status}","${r.registeredAt}"`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gdg_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage("Registrations CSV downloaded successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const confirmedCount = registrations.filter((r) => r.status === "Confirmed").length;
  const checkedInCount = registrations.filter((r) => r.status === "Checked In").length;
  const waitlistCount = registrations.filter((r) => r.status === "Waitlist").length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#5f6368] mb-1">
            <span>Portal</span>
            <span>/</span>
            <span className="text-[#202124] font-medium">Registrations</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
              Event Registrations
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f4ea] text-[#137333] px-2.5 py-0.5 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
              Live Firestore Sync
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1">
            Review real-time attendee signups from the DevFest homepage form and manage event check-ins
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#3c4043] hover:bg-[#f8f9fa] transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <span>📥 Export CSV</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-lg bg-[#e6f4ea] border border-[#ceead6] text-[#137333] text-xs sm:text-sm font-medium">
          ✓ {toastMessage}
        </div>
      )}

      {/* Mini Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="google-card p-4 bg-white">
          <div className="text-xs text-[#5f6368]">Total Shown</div>
          <div className="mt-1 text-2xl font-bold text-[#202124]">
            {filteredRegistrations.length}
          </div>
        </div>
        <div className="google-card p-4 bg-white">
          <div className="text-xs text-[#137333] font-medium">Checked In</div>
          <div className="mt-1 text-2xl font-bold text-[#137333]">
            {checkedInCount}
          </div>
        </div>
        <div className="google-card p-4 bg-white">
          <div className="text-xs text-[#1a73e8] font-medium">Confirmed Attendees</div>
          <div className="mt-1 text-2xl font-bold text-[#1a73e8]">
            {confirmedCount}
          </div>
        </div>
      </div>

      {/* Filter and Table Card */}
      <div className="google-card bg-white overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#f1f3f4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#80868b]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search attendee, email..."
              className="w-full pl-9 pr-3.5 py-1.5 text-xs sm:text-sm rounded-xl border border-[#dadce0] bg-white text-[#202124] focus:border-[#1a73e8] outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#5f6368]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs sm:text-sm rounded-xl border border-[#dadce0] px-3 py-1.5 bg-white text-[#202124] outline-none cursor-pointer"
            >
              <option value="all">All ({registrations.length})</option>
              <option value="Confirmed">Confirmed ({confirmedCount})</option>
              <option value="Checked In">Checked In ({checkedInCount})</option>
              <option value="Waitlist">Waitlist ({waitlistCount})</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-[#dadce0] text-[#5f6368] font-medium">
                <th className="py-3 px-4 sm:px-6">Reg ID</th>
                <th className="py-3 px-4">Attendee</th>
                <th className="py-3 px-4 hidden md:table-cell">Event</th>
                <th className="py-3 px-4 hidden sm:table-cell">Ticket</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right sm:px-6">Check-in Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3f4]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-[#5f6368]">
                    Loading real-time registrations from Firestore…
                  </td>
                </tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#5f6368]">
                    No registrations found. Register via the DevFest form on the homepage!
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-xs text-[#5f6368]">
                      {reg.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#202124]">{reg.userName}</div>
                      <div className="text-xs text-[#5f6368]">{reg.userEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell text-[#3c4043]">
                      {reg.eventTitle}
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className="rounded-md bg-[#f1f3f4] px-2 py-0.5 text-xs text-[#3c4043]">
                        {reg.ticketType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          reg.status === "Checked In"
                            ? "bg-[#e6f4ea] text-[#137333] border-[#ceead6]"
                            : reg.status === "Confirmed"
                            ? "bg-[#e8f0fe] text-[#1a73e8] border-[#d2e3fc]"
                            : "bg-[#fef7e0] text-[#b06000] border-[#fde293]"
                        }`}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => toggleCheckIn(reg.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                          reg.status === "Checked In"
                            ? "border border-[#dadce0] text-[#5f6368] hover:bg-[#f1f3f4]"
                            : "bg-[#188038] text-white hover:bg-[#137333]"
                        }`}
                      >
                        {reg.status === "Checked In" ? "Undo Check-In" : "Check In ✓"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
