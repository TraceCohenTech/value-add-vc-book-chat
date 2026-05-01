import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "The Value Add VC — Venture Capital in the AI Era | Trace Cohen",
    template: "%s | The Value Add VC",
  },
  description:
    "20 chapters of actionable insights on fundraising, fund economics, vertical AI, and venture capital — by Trace Cohen. Read free online or download.",
  metadataBase: new URL("https://value-add-vc-book-chat.vercel.app"),
  openGraph: {
    title: "The Value Add VC — Venture Capital in the AI Era",
    description:
      "20 chapters of actionable VC insights by Trace Cohen. Fundraising, fund economics, vertical AI, and more.",
    images: ["/book-cover.png"],
    type: "website",
    siteName: "The Value Add VC",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Value Add VC — Venture Capital in the AI Era",
    description:
      "20 chapters of actionable VC insights by Trace Cohen.",
    creator: "@Trace_Cohen",
    images: ["/book-cover.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://value-add-vc-book-chat.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0e14] text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              name: "The Value Add VC: Cheering From the Sidelines",
              author: {
                "@type": "Person",
                name: "Trace Cohen",
                url: "https://x.com/Trace_Cohen",
              },
              description:
                "A Practical Guide to Venture Capital in the AI Era — 20 chapters on fundraising, fund economics, and vertical AI.",
              image: "https://value-add-vc-book-chat.vercel.app/book-cover.png",
              url: "https://value-add-vc-book-chat.vercel.app",
              numberOfPages: 20,
              bookFormat: "https://schema.org/EBook",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
