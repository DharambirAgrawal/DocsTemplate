// app/blog/components/BlogGrid.tsx
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface PostProps {
  success: boolean;
  message?: string;
  data?: {
    title: string;
    slug: string;
    imageUrl: string;
    summary: string;
    publishedAt: string;
    tags: { name: string; slug: string }[];
    author: {
      image: string;
      firstName: string;
      lastName: string;
      email: string;
      bio: string;
      title: string;
    };
    categories: {
      name: string;
      slug: string;
    }[];
  }[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface BlogGridProps {
  posts: PostProps["data"];
}

export default function BlogGrid({ posts = [] }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <article
          key={post.slug}
          className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col "
        >
          <div className="aspect-[16/9] relative overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag.slug}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-200"
            >
              <span className="text-xl font-bold mb-3 bg-left-bottom bg-gradient-to-r from-blue-600 to-blue-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500">
                {post.title}
              </span>
            </Link>

            <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>

            <div className="mt-auto pt-4 border-t flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={post.author?.image || "/images/default-avatar.png"}
                  alt={post.author?.firstName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {post.author.firstName} {post.author?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </div>

              <Link
                href={`/category/${post.categories[0].slug}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {post.categories[0].name}
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
