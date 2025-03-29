"use client"; // This marks this file as a client component

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import client-side only components

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

const SpeedInsights = dynamic(() =>
  import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights)
);

type Props = {
  children: React.ReactNode;
};

const LayoutClientComponents: React.FC<Props> = ({ children }) => {
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
          <SpeedInsights />
          {children}
          {/* Add Google Ads with dynamic client-side loading */}
        </ToastProvider>
      </ConfirmationProvider>
    </>
  );
};

export default LayoutClientComponents;
