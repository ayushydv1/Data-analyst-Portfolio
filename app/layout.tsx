import type { Metadata, Viewport } from "next";
import { Sora, Syne } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/data";
import { getMetadataBase } from "@/lib/site-url";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Data Analyst and Power BI Developer based in Delhi. 4+ years building dashboards, DAX models, SQL pipelines and KPI reporting.",
  keywords: [
    "Md Asif Ansari",
    "Data Analyst",
    "Power BI Developer",
    "DAX",
    "SQL",
    "Delhi",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: `${site.name} — ${site.title}`,
    description:
      "Data Analyst and Power BI Developer based in Delhi. Interactive dashboards, data modeling and KPI reporting.",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description:
      "Data Analyst and Power BI Developer based in Delhi. Interactive dashboards, data modeling and KPI reporting.",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#060910",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg font-sans text-fg">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <div className="grain" aria-hidden />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
