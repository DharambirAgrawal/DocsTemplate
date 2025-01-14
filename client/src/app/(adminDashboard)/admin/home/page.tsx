import Home from "../../components/Dashboard/index"
import { Metadata } from "next";
import DefaultLayout from "@/app/(adminDashboard)/components/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function HomePage() {
  return (
    <>
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    </>
  );
}
