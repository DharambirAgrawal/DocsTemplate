'use client'
import ImageUpload from "@/app/(dashboard)/components/Images/ImageUpload";
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
    formData.append('file', file);
    formData.append('details', JSON.stringify(details));

    // Implement your upload logic here
    try {
      // Example API call
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      // Handle success (e.g., show notification)
    } catch (error) {
      // Handle error (e.g., show error notification)
      throw error;
    }
  };

  return (
    <div className="py-8">
      <ImageUpload onUpload={handleUpload} />
    </div>
  );
};

export default UploadPage;