import Breadcrumb from "@/components/ui/Breadcrumb";

import { Metadata } from "next";
import SettingBoxes from "@/app/(adminDashboard)/components/Setting";

export const metadata: Metadata = {
  title: "Next.js Settings Page | NextAdmin - Next.js Dashboard c",
  description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const Settings = () => {
  return (
 
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Settings" />

        <SettingBoxes />
      </div>
   
  );
};

export default Settings;
