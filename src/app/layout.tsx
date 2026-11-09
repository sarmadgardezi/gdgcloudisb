import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import Footer from "@/layout/footer";
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
  title: "GDG Cloud Islamabad",
  description: "Official community website for Google Developer Groups Cloud Islamabad",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${googleSansCode.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#18191c]">
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
