"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/layout/header";
import Footer from "@/layout/footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal");

  if (isPortal) {
    return <div className="flex-1 flex flex-col bg-[#f8f9fa] min-h-screen">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-white">{children}</main>
      <Footer communityName="Cloud Islamabad" joinUrl="/login" />
    </>
  );
}

