
'use client';
import ImageGallery from "@/app/(dashboard)/components/Images/ImageGallery";
interface ImageType {
  id: string;
  url: string;
  title: string;
  altText: string;
  description: string;
  tags: string[];
}
const DashboardPage = () => {
  const images: ImageType[] = [
    {
      id: '1',
      url: 'https://res.cloudinary.com/dsz3rgtpj/image/upload/v1735753884/pathgurus/blog/dfjv6o4td21o0rtqdigd.png',
      title: 'Mountain Landscape',
      altText: 'Beautiful mountain landscape at sunset',
      description: 'A stunning view of mountains during golden hour',
      tags: ['nature', 'landscape', 'mountains']
    },
    {
      id: '2',
      url: 'https://res.cloudinary.com/dsz3rgtpj/image/upload/v1735753884/pathgurus/blog/dfjv6o4td21o0rtqdigd.png',
      title: 'Beach Sunset',
      altText: 'Colorful sunset at the beach',
      description: 'A beautiful sunset view from the beach',
      tags: ['nature', 'sunset', 'beach']
    },
    {
      id: '3',
      url: 'https://res.cloudinary.com/dsz3rgtpj/image/upload/v1735753884/pathgurus/blog/dfjv6o4td21o0rtqdigd.png',
      title: 'City Skyline',
      altText: 'City skyline at night',
      description: 'A night view of the city skyline',
      tags: ['city', 'skyline', 'night']
    },
    {
      id: '4',
      url: 'https://res.cloudinary.com/dsz3rgtpj/image/upload/v1735753884/pathgurus/blog/dfjv6o4td21o0rtqdigd.png',
      title: 'City Skyline',
      altText: 'City skyline at night',
      description: 'A night view of the city skyline',
      tags: ['city', 'skyline', 'night']
    },
    {
      id: '5',
      url: 'https://res.cloudinary.com/dsz3rgtpj/image/upload/v1735753884/pathgurus/blog/dfjv6o4td21o0rtqdigd.png',
      title: 'City Skyline',
      altText: 'City skyline at night',
      description: 'A night view of the city skyline',
      tags: ['city', 'skyline', 'night']
    },

  ];

  const handleSave = (updatedImage: ImageType) => {
    // Implement save logic here
    console.log('Saving image:', updatedImage);
  };

  const handleDelete = (imageId: string) => {
    // Implement delete logic here
    console.log('Deleting image:', imageId);
  };

  return (
    <div className="py-8">
      <ImageGallery
        images={images}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DashboardPage;