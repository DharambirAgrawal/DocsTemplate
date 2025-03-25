// components/DefaultLayout.tsx
import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Header"), {
  loading: () => <p>Loading...</p>,
});
const Footer = dynamic(() => import("./Footer"), {
  loading: () => <p>Loading...</p>,
});

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        {/* <div className="max-w-7xl mx-auto px-4 py-8"> */}
        {children}
        {/* </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
