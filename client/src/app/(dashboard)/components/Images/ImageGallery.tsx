"use client";
// ImageGallery.tsx
import React, { useState } from "react";
import { Copy, X, Trash2, Save } from "lucide-react";

// types.ts
interface ImageType {
  id: string;
  url: string;
  title: string;
  altText: string;
  description: string;
  tags: string[];
}

interface ImageGalleryProps {
  images: ImageType[];
  onSave: (image: ImageType) => void;
  onDelete: (id: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onSave,
  onDelete,
}) => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [editedImage, setEditedImage] = useState<ImageType | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // You can add a toast notification here
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleImageClick = (image: ImageType) => {
    console.log("Image clicked:", image);
    setSelectedImage(image);
    setEditedImage(image);
    setShowDialog(true);
  };

  const handleSave = () => {
    if (editedImage) {
      onSave(editedImage);
      setShowDialog(false);
    }
  };

  const handleDelete = () => {
    if (selectedImage) {
      onDelete(selectedImage.id);
      setShowDialog(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <div className="aspect-square overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            onClick={() => {
                handleImageClick(image);
              }}
            >
              <img
                src={image.url}
                alt={image.altText}
                className="w-full h-full object-cover cursor-pointer"
                
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-medium truncate">
                  {image.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(image.url);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
                >
                  <Copy className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Details Dialog */}
      {showDialog && editedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowDialog(false)}
          />
          <div className="relative bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowDialog(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={editedImage.url}
                  alt={editedImage.altText}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editedImage.title}
                    onChange={(e) =>
                      setEditedImage({ ...editedImage, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={editedImage.altText}
                    onChange={(e) =>
                      setEditedImage({
                        ...editedImage,
                        altText: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editedImage.description}
                    onChange={(e) =>
                      setEditedImage({
                        ...editedImage,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={editedImage.tags.join(", ")}
                    onChange={(e) =>
                      setEditedImage({
                        ...editedImage,
                        tags: e.target.value
                          .split(",")
                          .map((tag) => tag.trim()),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={handleDelete}
                    className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
