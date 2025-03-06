import { AppSidebar } from "./AppSidebar";
import { PageNavigation } from "./PageNavigation";
import { getCourseAction } from "./actions";

interface DefaultLayoutProps {
  children: React.ReactNode;
  courseSlug: string;
}

interface navigationType {
  success: boolean;
  data?: {
    order: number;
    title: string;
    sections: {
      order: number;
      slug: string;
      title: string;
    }[];
  }[];
}

const DefaultLayout: React.FC<DefaultLayoutProps> = async ({
  children,
  courseSlug,
}) => {
  const courseSlugs: navigationType = await getCourseAction("slug", courseSlug);
  if (!courseSlugs.success && !courseSlugs.data) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {courseSlugs.data && <AppSidebar navigation={courseSlugs.data} />}

        {children}
        {courseSlugs.data && <PageNavigation navigation={courseSlugs.data} />}
      </div>
    </>
  );
};

export default DefaultLayout;
