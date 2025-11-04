import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ConvexClientProvider } from "./providers/ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audiophile ",
  description: "Quality Sounds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col`}
      >
        <ConvexClientProvider>
          <Header />
          <main className="grow max-w-[1400px] w-full mx-auto">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
