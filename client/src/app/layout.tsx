// import "../../styles/globals.css";
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
// import dynamic from "next/dynamic";
// import { ConfirmationProvider } from "@/features/Confirmation/AdvanceConfirmation";
// import GoogleAdsense from "@/features/GoogleAds/GoogleAds";

// import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { landingPageMetadata } from "./metaData";
// import ToastProvider from "@/features/ToastNotification/ToastProvider";
// export const metadata = landingPageMetadata;
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <GoogleTagManager gtmId="G-RSXN3WLXFT" />
//       <body className={`${inter.className} antialiased scroll-smooth`}>
//         <ConfirmationProvider>
//           <ToastProvider>
//             {children}
//             <SpeedInsights />
//           </ToastProvider>
//         </ConfirmationProvider>
//       </body>
//       {process.env.NODE_ENV === "production" && (
//         <>
//           <GoogleTagManager gtmId="G-RSXN3WLXFT" />
//           <GoogleAnalytics gaId="G-RSXN3WLXFT" />
//         </>
//       )}
//     </html>
//   );
// }
// import "../../styles/globals.css";
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

// import dynamic from "next/dynamic";

// // Dynamically import components
// const GoogleAdsense = dynamic(() => import("@/features/GoogleAds/GoogleAds"), {
//   ssr: false,
// });
// const ConfirmationProvider = dynamic(
//   () =>
//     import("@/features/Confirmation/AdvanceConfirmation").then(
//       (mod) => mod.ConfirmationProvider
//     ),
//   { ssr: false }
// );
// const ToastProvider = dynamic(
//   () => import("@/features/ToastNotification/ToastProvider"),
//   { ssr: false }
// );

// // Dynamically import Google Analytics and Google Tag Manager for client-side only
// const GoogleAnalytics = dynamic(() =>
//   import("@next/third-parties/google").then((mod) => mod.GoogleAnalytics)
// );
// const GoogleTagManager = dynamic(() =>
//   import("@next/third-parties/google").then((mod) => mod.GoogleTagManager)
// );

// // Dynamically import Vercel SpeedInsights for client-side only
// const SpeedInsights = dynamic(() =>
//   import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights)
// );

// import { landingPageMetadata } from "./metaData";
// export const metadata = landingPageMetadata;

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} antialiased scroll-smooth`}>
//         <ConfirmationProvider>
//           <ToastProvider>
//             {children}
//             <SpeedInsights />
//           </ToastProvider>
//         </ConfirmationProvider>
//       </body>

//       {/* Load Analytics and Tag Manager only in production */}
//       {process.env.NODE_ENV === "production" && (
//         <>
//           <GoogleTagManager gtmId="G-RSXN3WLXFT" />
//           <GoogleAnalytics gaId="G-RSXN3WLXFT" />

//         </>
//       )}
//     </html>
//   );
// }

import "../../styles/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { landingPageMetadata } from "./metaData";
export const metadata = landingPageMetadata;

import LayoutClientComponents from "./LayoutClientComponent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased scroll-smooth`}>
        <LayoutClientComponents pId="your-google-adsense-pId">
          {children}
        </LayoutClientComponents>
      </body>
    </html>
  );
}
