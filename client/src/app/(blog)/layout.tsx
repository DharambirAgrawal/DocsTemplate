import dynamic from "next/dynamic";
import Loader from "@/components/ui/Loader";
const DefaultLayout = dynamic(() => import("@/components/DefaultLayout"), {
  loading: () => <Loader />,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DefaultLayout>{children}</DefaultLayout>
    </>
  );
}
