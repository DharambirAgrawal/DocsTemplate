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
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>
          We are currently working on it to prepare. Sorry for the
          inconvenience.
        </p>
      </div>
      {/* <DashboardHome /> */}
    </>
  );
}
