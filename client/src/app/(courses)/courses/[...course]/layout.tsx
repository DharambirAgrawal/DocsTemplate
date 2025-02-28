import { AppSidebar } from "@/app/(courses)/components/AppSidebar";
import Navigation from "@/components/Header";

import DefaultLayout from "../../components/DefaultLayout";
import { notFound } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return notFound();
  return (
    <>
      <DefaultLayout>
        {/* <Navigation /> */}

        {/* <div className="flex min-h-screen"> */}
        {/* <AppSidebar /> */}

        {children}

        {/* </div> */}
      </DefaultLayout>
    </>
  );
}
