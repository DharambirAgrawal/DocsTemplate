import "../../styles/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import dynamic from "next/dynamic";
import { ConfirmationProvider } from "@/features/Confirmation/AdvanceConfirmation";
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
      <body className={`${inter.className} antialiased scroll-smooth`}>
        <ConfirmationProvider>
          <ToastProvider>{children}</ToastProvider>
        </ConfirmationProvider>
      </body>
    </html>
  );
}
