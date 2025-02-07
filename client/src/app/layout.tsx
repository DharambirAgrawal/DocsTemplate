import "../../styles/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import dynamic from "next/dynamic";
import { ConfirmationProvider } from "@/features/Confirmation/AdvanceConfirmation";
export const metadata = {
  title: "Minimal Docs Site",
  description: "A gorgeous minimal documentation site using Next.js App Router",
};
import ToastProvider from "@/features/ToastNotification/ToastProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ConfirmationProvider>
          <ToastProvider>{children}</ToastProvider>
        </ConfirmationProvider>
      </body>
    </html>
  );
}
