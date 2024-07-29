import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { GeistSans } from "geist/font/sans";

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
          {/* <Navbar /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
