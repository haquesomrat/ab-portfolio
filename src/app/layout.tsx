import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import "@splidejs/splide/css";
import { ThemeProvider } from "@/provider/theme-provider";
import AuthProvider from "@/provider/auth-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "AB - The Developer",
  description: "Modern Thinking Developer With Impressive Ideas",
};

export default function HomepageLayout({
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
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
