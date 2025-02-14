import dynamic from "next/dynamic";
const DefaultLayout = dynamic(() => import("@/components/DefaultLayout"), {
  loading: () => <p>Loading...</p>,
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
