import ImageGallery from "@/app/(dashboard)/components/Images/ImageGallery";
import { getImagesAction } from "../actions";
const  GalleryPage = async() => {

  const res = await getImagesAction("BLOG");

  if (!res.success) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">Images not found</h2>
        <p className="text-gray-600">Please try again or contact support if the problem persists.</p>
      </div>
    );
  }

  if(res.data.length === 0) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">No images found</h2>
        <p className="text-gray-600">Please upload images to view them here.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <ImageGallery
        images={res.data}
     
      />
    </div>
  );
};

export default GalleryPage;