import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { GeistSans } from "geist/font/sans";
import { NextUIProvider } from "@nextui-org/system";
import MyNavbar from "@/components/ui/navbar";
import "@splidejs/splide/css";
import Footer from "@/components/footer/Footer";
import DemoNavbar from "@/components/global/demoNavbar";

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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextUIProvider>
            <MyNavbar />
            {/* <DemoNavbar /> */}
          </NextUIProvider>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
