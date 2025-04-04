import { Inter } from "next/font/google";
import "../../styles/globals.css";

const inter = Inter({
  subsets: ["latin"], // Consider including only the specific subsets you need
  display: "swap", // Ensures text remains visible while font loads
});
import { landingPageMetadata } from "./metaData";
export const metadata = landingPageMetadata;
import dynamic from "next/dynamic";

import LayoutClientComponents from "./LayoutClientComponent";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
const GoogleAdsense = dynamic(
  () => import("@/features/GoogleAds/GoogleAds"),
  {}
);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {process.env.NODE_ENV === "production" && (
        <GoogleTagManager gtmId={process.env.GTM_ID || ""} />
      )}

      <body className={`${inter.className} antialiased scroll-smooth`}>
        <LayoutClientComponents>{children}</LayoutClientComponents>
      </body>
      {process.env.NODE_ENV === "production" && (
        <>
          <GoogleAdsense pId={process.env.GOOGLE_ADSENSE_P_ID || ""} />
          <GoogleAnalytics gaId={process.env.GTM_ID || ""} />
        </>
      )}
    </html>
  );
}
