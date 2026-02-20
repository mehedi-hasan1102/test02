import type { Metadata } from "next";
import "./globals.css";
// import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import InfiniteMarquee from "./components/InfiniteMarquee";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mehedi-hasan.me"),
  title: "Mehedi Hasan | Full-Stack Developer & Web Engineer",
  description:
    "Portfolio of Mehedi Hasan - Full-Stack Developer specializing in Next.js, React, TypeScript, and modern web applications.",
  keywords: [
    "Mehedi Hasan",
    "Full-Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Express.js Developer",
    "MongoDB Developer",
    "Portfolio",
    "Web Engineer",
    "Software Engineer",
    "ReactJS Portfolio",
    "Next.js Portfolio",
    "Full-Stack Web Developer",
    "Web Application Developer",
  ],
  authors: [{ name: "Mehedi Hasan" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mehedi Hasan | Full-Stack Developer",
    description: "Portfolio of Mehedi Hasan - React & Next.js Developer",
    url: "https://www.mehedi-hasan.me",
    siteName: "Mehedi Hasan Portfolio",
    images: [
      {
        url: "/profile/profile.png",
        width: 1200,
        height: 630,
        alt: "Mehedi Hasan Portfolio",
      },
    ],
    locale: "en_US",
    alternateLocale: ["en_BD"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi Hasan | Full-Stack Developer",
    description: "Portfolio of Mehedi Hasan - React & Next.js Developer",
    images: ["/profile/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mehedi Hasan",
  url: "https://www.mehedi-hasan.me",
  sameAs: [
    "https://www.linkedin.com/in/mehedi-hasan1102",
    "https://github.com/mehedi-hasan1102",
  ],
  jobTitle: "Full-Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Self-employed",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';if(t==='light'){document.documentElement.classList.add('light-mode');}else{document.documentElement.classList.remove('light-mode');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        {/* <ThemeToggle /> */}
        {children}
        <Contact />
        <InfiniteMarquee />
      </body>
    </html>
  );
}
