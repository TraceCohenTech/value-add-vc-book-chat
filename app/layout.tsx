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
  title: "Ask the Value Add VC Book | AI Chat",
  description:
    "Chat with an AI trained on The Value Add VC Handbook — 22 chapters on fundraising, fund economics, and venture capital in the AI era by Trace Cohen.",
  openGraph: {
    title: "Ask the Value Add VC Book",
    description:
      "Chat with an AI trained on The Value Add VC Handbook by Trace Cohen.",
    images: ["/book-cover.png"],
  },
  icons: {
    icon: "/favicon.svg",
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
        {children}
      </body>
    </html>
  );
}
