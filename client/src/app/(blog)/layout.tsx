import DefaultLayout from "@/components/DefaultLayout";

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
