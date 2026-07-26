import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import { Header } from "./Header";
import { appearanceStorageKey, siteConfig } from "./site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0];
  const host = forwardedHost?.trim() || requestHeaders.get("host");
  const forwardedProtocol = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",")[0]
    .trim();
  const protocol =
    forwardedProtocol || (host?.startsWith("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : "http://localhost:3000";
  const socialImage = new URL("/og.png", origin).toString();

  return {
    title: siteConfig.name,
    description: siteConfig.description,
    openGraph: {
      type: "website",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [
        {
          url: socialImage,
          width: 1732,
          height: 908,
          alt: "Vishvous Work — selected writing, projects, and research",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [socialImage],
    },
  };
}

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
      <body className={geistSans.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
