"use client";

import React, { useState } from "react";
import PortalHeader from "@/components/portal/portal-header";
import PortalSidebar from "@/components/portal/portal-sidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      <PortalHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex w-full">
        <PortalSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

