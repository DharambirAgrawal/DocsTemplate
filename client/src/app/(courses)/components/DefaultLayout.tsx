import { AppSidebar } from "./AppSidebar";
import Header from "@/components/Header";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export interface NavItem {
  name: string;
  href: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
<>
      {/* Header - Always visible */}
      <Header />

      <div className="flex min-h-screen pt-10">
        <AppSidebar />

        {children}
      </div>
</>
  );
};

export default DefaultLayout;
