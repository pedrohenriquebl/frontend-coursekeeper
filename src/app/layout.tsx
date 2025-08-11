import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthUserProvider } from "@/context/authUserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CourseKeeper",
  description: "A platform to keep track of your courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}
        antialiased bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800`}
      >
        <AuthUserProvider>
          {children}
        </AuthUserProvider>
      </body>
    </html>
  );
}
