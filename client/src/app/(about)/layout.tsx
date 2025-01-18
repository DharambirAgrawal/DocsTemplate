import DefaultLayout from "@/components/DefaultLayout";
export const metadata = {
  title: "Minimal Docs Site",
  description: "A gorgeous minimal documentation site using Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout>

      {children}
    </DefaultLayout>
    
       
    
  );
}
