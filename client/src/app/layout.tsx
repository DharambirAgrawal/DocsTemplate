import "../../styles/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import dynamic from "next/dynamic";
import { ConfirmationProvider } from "@/features/Confirmation/AdvanceConfirmation";
import GoogleAdsense from "@/features/GoogleAds/GoogleAds";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { landingPageMetadata } from "./metaData";
import ToastProvider from "@/features/ToastNotification/ToastProvider";
export const metadata = landingPageMetadata;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-RSXN3WLXFT" />
      <body className={`${inter.className} antialiased scroll-smooth`}>
        <ConfirmationProvider>
          <ToastProvider>
            {children}
            <SpeedInsights />
          </ToastProvider>
        </ConfirmationProvider>
      </body>
      {process.env.NODE_ENV === "production" && (
        <>
          <GoogleTagManager gtmId="G-RSXN3WLXFT" />
          <GoogleAnalytics gaId="G-RSXN3WLXFT" />
        </>
      )}
    </html>
  );
}
