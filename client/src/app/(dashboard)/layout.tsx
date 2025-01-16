"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
    {loading ? <Loader /> : children}
    </>
  );
}
