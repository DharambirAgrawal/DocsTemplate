"use client";
import ImageUpload from "@/app/(dashboard)/components/Images/ImageUpload";
import { showToast } from "@/features/ToastNotification/useToast";

import { uploadImageAction } from "../actions";
interface ImageDetails {
  title: string;
  altText: string;
  description: string;
  tags: string[];
}
const UploadPage = () => {
  const handleUpload = async (file: File, details: ImageDetails) => {
    // Create FormData and append file and details
    const formData = new FormData();
    formData.append("file", file);
    formData.append("details", JSON.stringify(details));
    const res = await uploadImageAction(formData, "BLOG");
    if (res.success) {
      showToast("success", res.message || "Success");
    } else {
      showToast("error", res.error?.message || "Something went wrong");
    }
    // Implement your upload logic here
  };

  return (
    <div className="py-8">
      <ImageUpload onUpload={handleUpload} />
    </div>
  );
};

export default UploadPage;
