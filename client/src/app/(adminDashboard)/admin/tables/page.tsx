import Breadcrumb from "@/components/ui/Breadcrumb";
import TableOne from "@/components/ui/Tables/TableOne";
import TableThree from "@/components/ui/Tables/TableThree";
import TableTwo from "@/components/ui/Tables/TableTwo";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const TablesPage = () => {
  return (
<>
<Breadcrumb pageName="Tables" />

<div className="flex flex-col gap-10">
<TableOne />
<TableTwo />
<TableThree />
</div>
</>

  );
};

export default TablesPage;
