import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://financepilot.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FinancePilot — Learn Smarter. Save Better. Invest Wisely.",
    template: "%s | FinancePilot",
  },
  description:
    "FinancePilot is a personal finance authority covering banking, investing, saving, budgeting, credit cards, and retirement — practical guidance you can trust.",
  openGraph: {
    type: "website",
    siteName: "FinancePilot",
    title: "FinancePilot — Learn Smarter. Save Better. Invest Wisely.",
    description:
      "Practical, trustworthy personal finance guidance: banking, investing, saving, budgeting, credit cards, and retirement.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "FinancePilot",
    description:
      "Learn Smarter. Save Better. Invest Wisely. Practical personal finance guidance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FinancePilot",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FinancePilot",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
