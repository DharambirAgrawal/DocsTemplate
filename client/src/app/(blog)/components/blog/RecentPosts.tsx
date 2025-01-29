import { getPosts } from '@/lib/publicActions';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
interface RecentPostProp {
  status: 'error' | 'success';
  data: {
    title: string;
    slug: string;
    imageUrl: string;
    publishedAt: string;
    user: {
      name: string;
    };
  }[];
}
const RecentPosts = async () => {
  const recentPosts: RecentPostProp = await getPosts({
    limit: 3,
    recent: true,
  });
  return (
    <div className="space-y-4 sm:space-y-6">
      {recentPosts.data.map((post, index) => (
        <Link
          key={index}
          href={`/blog/${post.slug}`}
          className="flex gap-3 sm:gap-4 group cursor-pointer"
        >
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
              {post.title}
            </h3>
            <div className="text-xs sm:text-sm text-gray-500 space-x-2">
              {post.user && <span>{post.user.name}</span>}
              <span>•</span>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecentPosts;