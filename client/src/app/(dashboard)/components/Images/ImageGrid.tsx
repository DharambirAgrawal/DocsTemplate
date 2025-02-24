import { Copy } from "lucide-react";
import Image from "next/image";
interface ImageProp {
  images: {
    url: string;
    title: string;
    altText: string;
  }[];
  handleImageClick?: (image: any) => void;
}

const ImageGrid = ({ images, handleImageClick }: ImageProp) => {
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // You can add a toast notification here
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <div
            className="aspect-square overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            onClick={() => {
              if (handleImageClick) {
                handleImageClick(image);
              }
            }}
          >
            <Image
              src={image.url}
              alt={image.altText}
              className="w-full h-full object-cover cursor-pointer"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white font-medium truncate">{image.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(image.url);
                }}
                aria-label={`Copy URL for image titled ${image.title}`}
                className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
              >
                <Copy className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
