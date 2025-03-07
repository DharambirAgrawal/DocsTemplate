import { AppSidebar } from "./AppSidebar";
import { PageNavigation } from "./PageNavigation";

interface navigationType {
  order: number;
  title: string;
  sections: {
    order: number;
    slug: string;
    title: string;
  }[];
}
interface DefaultLayoutProps {
  children: React.ReactNode;
  navigation: navigationType[];
}

const DefaultLayout: React.FC<DefaultLayoutProps> = async ({
  children,
  navigation,
}) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <AppSidebar navigation={navigation} />

        {children}
        <PageNavigation navigation={navigation} />
      </div>
    </>
  );
};

export default DefaultLayout;
