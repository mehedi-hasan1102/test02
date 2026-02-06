import type { Metadata } from "next";
import "./globals.css";
// import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";

export const metadata: Metadata = {
  title: "Mehedi Hasan | Developer, Storyteller & Technical Writer",
  description: "Discover Mehedi Hasan’s portfolio of Next.js and React projects, case studies, and technical writing. Learn through stories and code.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* <ThemeToggle /> */}
        {children}
        <Contact />
      </body>
    </html>
  );
}
