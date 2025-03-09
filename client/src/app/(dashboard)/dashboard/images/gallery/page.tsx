import ImageGallery from "@/app/(dashboard)/components/Images/ImageGallery";
import { getImagesAction } from "../actions";
import Pagination from "@/components/Pagination";

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}
const GalleryPage = async ({ searchParams }: PageProps) => {
  const searchParamsResolved = await searchParams;
  const currentPage = Number(searchParamsResolved.page) || 1;
  const imagesPerPage = 10;
  const res = await getImagesAction({
    folder: "BLOG",
    limit: imagesPerPage,
    page: currentPage,
  });

  if (!res.success) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">
          Images not found
        </h2>
        <p className="text-gray-600">
          Please try again or contact support if the problem persists.
        </p>
      </div>
    );
  }

  if (res.data.length === 0) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">No images found</h2>
        <p className="text-gray-600">Please upload images to view them here.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <ImageGallery images={res.data} />
      <Pagination
        currentPage={currentPage}
        totalPages={res.pagination?.totalPages || 1}
      />
    </div>
  );
};

export default GalleryPage;
