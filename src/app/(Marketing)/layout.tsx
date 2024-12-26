import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TripUtopia",
  description:
    "We are a group of passionate travellers and culture explorers connected through this big, diverse country - UK. As students and young professionals, we want to create a platform for like-minded people to share and connect on our passion to discover the global world we live in.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
