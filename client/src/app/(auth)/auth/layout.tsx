import Navigation from "@/components/Header";

export const metadata = {
  title: "Login",
  description: "A gorgeous minimal documentation site using Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
