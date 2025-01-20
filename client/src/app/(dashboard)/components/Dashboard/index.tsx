"use client";
import React from "react";
import ChartThree from "@/components/Charts/ChartThree";
import ChartTwo from "@/components/Charts/ChartTwo";
import TableOne from "@/components/ui/Tables/TableOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import { showToast } from "@/features/ToastNotification/useToast";
import BasicChart from "@/components/Charts/BasicChart";
const DashboardHome=()=> {
  const triggerToast = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    showToast(type, message); // Trigger the toast notification
  }
  return (
    <>
      <DataStatsOne />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      <button onClick={() => triggerToast('success', 'This is a success message!')}>Show Success Toast</button>
      <button onClick={() => triggerToast('error', 'This is an error message!')}>Show Error Toast</button>
      <button onClick={() => triggerToast('info', 'This is an info message!')}>Show Info Toast</button>
      <button onClick={() => triggerToast('warning', 'This is a warning message!')}>Show Warning Toast</button>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
      </div>
      <div className="py-4">

        <BasicChart />
      </div>
    </>
  );
};

export default DashboardHome
