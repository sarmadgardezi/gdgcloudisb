import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import SiteShell from "@/layout/site-shell";
import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GDG Cloud Islamabad – Google Developer Groups",
  description:
    "Official community website for Google Developer Groups Cloud Islamabad. Talks, workshops, study groups, and hands-on labs on Google Cloud & AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${googleSansCode.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#202124]">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
