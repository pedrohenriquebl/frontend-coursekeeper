import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AuthUserProvider } from "@/context/authUserContext";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"], 
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
        className={`${nunitoSans.variable}
        antialiased bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 min-h-screen`}
        style={{ fontFamily: 'var(--font-nunito-sans), ui-sans-serif, system-ui, sans-serif' }}
      >
        <AuthUserProvider>
          {children}
        </AuthUserProvider>
      </body>
    </html>
  );
}
