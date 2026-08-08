import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { Header } from "./Header";
import { appearanceStorageKey, siteConfig } from "./site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

const appearanceScript = `
  try {
    var appearanceStorageKey = ${JSON.stringify(appearanceStorageKey)};
    var savedAppearance = localStorage.getItem(appearanceStorageKey);
    document.documentElement.dataset.appearance =
      savedAppearance === "dark" || savedAppearance === "darker"
        ? "dark"
        : "light";
    if (savedAppearance === "darker") {
      localStorage.setItem(appearanceStorageKey, "dark");
    }
  } catch (error) {
    document.documentElement.dataset.appearance = "light";
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-appearance="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body className={`${geistSans.variable} ${inter.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
