// components/DefaultLayout.tsx
import Header from "./Header";
import Footer from "./Footer";
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
