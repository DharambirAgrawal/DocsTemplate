// app/blog/components/BlogHeader.tsx
interface BlogHeaderProps {
  totalPosts: number;
}

export default function BlogHeader({ totalPosts }: BlogHeaderProps) {
  return (
    <div className="text-center mb-12 space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
        Our Blog
      </h1>
      <p className="text-gray-600 text-lg">
        Discover {totalPosts} stories, thoughts, and insights
      </p>
      <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
    </div>
  );
}
