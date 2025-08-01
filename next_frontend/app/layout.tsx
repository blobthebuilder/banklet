import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});
export const metadata: Metadata = {
  title: "Banklet",
  description: "Banklet is a modern financial tracker",
  icons: { icon: "/icons/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning>
        <body
          className={`${inter.variable} ${ibmPlexSerif.variable} antialiased`}>
          {children}
          <Script
            src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"
            strategy="afterInteractive"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
