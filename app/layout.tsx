import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CONTACT_EMAIL_PUBLIC, CREED } from "@/lib/catalog";

export const metadata: Metadata = {
  title: {
    default: "Henry Intel — Local AI Operator",
    template: "%s — Henry Intel",
  },
  description:
    "A 14-day install of a private AI stack for one local business. Same-week audit, one working agent on your job data, 14-day ride-along. Legal payee: H & H INVESTIGATION.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  robots: { index: true, follow: true },
  openGraph: {
    title: "Henry Intel — Local AI Operator",
    description:
      "Private AI for one local shop. Not a ChatGPT login. Not a website chatbot.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site">
          <Header />
          <main>{children}</main>
          <Footer email={CONTACT_EMAIL_PUBLIC} creed={CREED} />
        </div>
      </body>
    </html>
  );
}
