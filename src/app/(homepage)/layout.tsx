import type { Metadata } from "next";
import Footer from "@/components/homepage/footer/Footer";
import Navbar from "@/components/homepage/navbar/Navbar";

export const metadata: Metadata = {
  title: "AB - The Developer",
  description: "Modern Thinking Developer With Impressive Ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
