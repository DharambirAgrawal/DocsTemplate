import DashboardHome from "../../components/Dashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pathgurus",
  description: "This is dashboard page",
};

export default function HomePage() {
  return (
    <>
      <DashboardHome />
    </>
  );
}
