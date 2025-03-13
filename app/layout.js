import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./_components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MetaVFest",
  description: "Biggest Anime Game Festival",
};

export default function RootLayout({ children }) {
  const isAdminPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative h-screen overflow-y-auto`}>
        <div className="relative z-10">
        <LayoutWrapper>{children}</LayoutWrapper>
        </div>
        {!isAdminPage && (
          <video src="/videos/background.mp4" className="fixed top-0 left-0 w-full h-full object-cover -z-10" autoPlay loop muted></video>
        )}
      </body>
    </html>
  );
}
