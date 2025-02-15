import DefaultLayout from "@/components/DefaultLayout";
import type { Metadata } from "next";
import { aboutLayoutMetadata } from "./metaData";

export const metadata: Metadata = aboutLayoutMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
