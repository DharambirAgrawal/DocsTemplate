"use client";
// ImageGallery.tsx
import React, { useState } from "react";
import { X, Trash2, Save } from "lucide-react";
import ImageGrid from "./ImageGrid";
import { deleteImagesAction } from "../../dashboard/images/actions";
import { showToast } from "@/features/ToastNotification/useToast";
import { updateImageAction } from "../../dashboard/images/actions";
// types.ts
interface ImageType {
  publicId: string;
  url: string;
  title: string;
  altText: string;
  description: string;
  tags: string[];
}

interface ImageGalleryProps {
  images: ImageType[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [editedImage, setEditedImage] = useState<ImageType | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState({
    type: "",
    state: false,
  });

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
    setEditedImage(image);
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (editedImage) {
      setLoading({
        type: "save",
        state: true,
      });
      const res = await updateImageAction(editedImage);
      if (res.success) {
        showToast("success", res.message || "Successfully saved image");
      } else {
        showToast("error", res.error?.message || "Something went wrong");
      }
      setShowDialog(false);
      setLoading({
        type: "",
        state: false,
      });
    }
  };

  const handleDelete = async () => {
    if (selectedImage) {
      setLoading({
        type: "delete",
        state: true,
      });
      const res = await deleteImagesAction(selectedImage.publicId);
      if (res.success) {
        showToast("success", res.message || "Successfully deleted image");
      } else {
        showToast("error", res.error?.message || "Something went wrong");
      }
      setShowDialog(false);
      setLoading({
        type: "",
        state: false,
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Image Grid */}
      <ImageGrid images={images} handleImageClick={handleImageClick} />

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
                    disabled={loading.state}
                    onClick={handleDelete}
                    className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {loading.type == "delete" && loading.state
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                  <button
                    disabled={loading.state}
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading.type == "save" && loading.state
                      ? "Saving..."
                      : "Save Changes"}
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
