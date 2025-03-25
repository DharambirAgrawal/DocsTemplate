"use client"; // This marks this file as a client component

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import client-side only components
const GoogleAdsense = dynamic(() => import("@/features/GoogleAds/GoogleAds"), {
  ssr: false,
});
const ConfirmationProvider = dynamic(
  () =>
    import("@/features/Confirmation/AdvanceConfirmation").then(
      (mod) => mod.ConfirmationProvider
    ),
  { ssr: false }
);
const ToastProvider = dynamic(
  () => import("@/features/ToastNotification/ToastProvider"),
  { ssr: false }
);
const GoogleAnalytics = dynamic(() =>
  import("@next/third-parties/google").then((mod) => mod.GoogleAnalytics)
);
const GoogleTagManager = dynamic(() =>
  import("@next/third-parties/google").then((mod) => mod.GoogleTagManager)
);
const SpeedInsights = dynamic(() =>
  import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights)
);

type Props = {
  children: React.ReactNode;
  pId: string;
};

const LayoutClientComponents: React.FC<Props> = ({ children, pId }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent client-only components from rendering until mounted on the client side
  if (!isMounted) return null;

  return (
    <>
      <ConfirmationProvider>
        <ToastProvider>
          {children}
          <SpeedInsights />
          {/* Add Google Ads with dynamic client-side loading */}
          <GoogleAdsense pId={pId} />
        </ToastProvider>
      </ConfirmationProvider>

      {/* Load Google Tag Manager and Analytics only in production */}
      {process.env.NODE_ENV === "production" && (
        <>
          <GoogleTagManager gtmId="G-RSXN3WLXFT" />
          <GoogleAnalytics gaId="G-RSXN3WLXFT" />
        </>
      )}
    </>
  );
};

export default LayoutClientComponents;
