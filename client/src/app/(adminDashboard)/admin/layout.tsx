"use client";
import DefaultLayout from "@/app/(adminDashboard)/components/DefaultLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return ( 
       <DefaultLayout>
       { children}
       </DefaultLayout>
  );
}
