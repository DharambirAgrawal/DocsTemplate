// ImageUpload.tsx
import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageDetails {
  title: string;
  altText: string;
  description: string;
  tags: string[];
}

interface ImageUploadProps {
  onUpload: (file: File, details: ImageDetails) => Promise<void>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [details, setDetails] = useState<ImageDetails>({
    title: "",
    altText: "",
    description: "",
    tags: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      // Auto-fill title from filename
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setDetails((prev) => ({
        ...prev,
        title: fileName.split("-").join(" "),
        altText: fileName.split("-").join(" "),
      }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); 
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      await onUpload(selectedFile, details);
      // Reset form after successful upload
      setSelectedFile(null);
      setPreview("");
      setDetails({
        title: "",
        altText: "",
        description: "",
        tags: [],
      });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center 
            ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            } 
            transition-colors duration-200`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>

            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-700">
                Upload your image
              </p>
              <p className="text-sm text-gray-500">
                Drag and drop your image here, or click to select
              </p>
            </div>

            <button
              type="button"
              onClick={handleButtonClick}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md 
                shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Select Image
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative bg-gray-50 aspect-video flex items-center justify-center">
          {preview ? (
    <Image
      height={400}
      width={600}
      src={preview} // Only render Image if there's a valid preview
      alt="Preview"
      className="max-h-full max-w-full object-contain"
    />
  ) : (
    <div className="text-gray-500">No preview available</div> // Optional: Add fallback content if no preview
  )}
           
            <button
              onClick={() => {
                setSelectedFile(null);
                setPreview("");
              }}
              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white 
                shadow-md transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={details.title}
                  onChange={(e) =>
                    setDetails({ ...details, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                    focus:border-blue-500 outline-none"
                  placeholder="Enter image title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={details.altText}
                  onChange={(e) =>
                    setDetails({ ...details, altText: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                    focus:border-blue-500 outline-none"
                  placeholder="Enter alt text"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={details.description}
                  onChange={(e) =>
                    setDetails({ ...details, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                    focus:border-blue-500 outline-none resize-none"
                  placeholder="Enter image description"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={details.tags.join(", ")}
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                    focus:border-blue-500 outline-none"
                  placeholder="Enter tags, separated by commas"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSubmit}
                disabled={isUploading}
                className={`flex items-center px-6 py-2 rounded-lg text-white 
                  ${
                    isUploading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors duration-200`}
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
