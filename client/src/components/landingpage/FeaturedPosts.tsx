import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/app/(blog)/components/actions";
interface BlogPost {
  title: string;
  timeRead: string;
  summary: string;
  imageUrl: string;
  slug: string;
  categories: {
    name: string;
    slug: string;
  }[];
  tags: {
    name: string;
    slug: string;
  }[];
  publishedAt: string;
  author: {
    firstName: string;
    lastName: string;
    image: string;
  };
}
interface ResponseType {
  success: boolean;
  data?: BlogPost[];
}
const PostCard = ({ post }: { post: BlogPost }) => (
  <article className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative h-64">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
      <Image
        src={post.imageUrl || "/"}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
          {post.categories[0].name}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={post.author.image || "/"}
          alt={post.author.firstName}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h4 className="text-sm font-medium text-gray-900">
            {post.author.firstName} {post.author.lastName}
          </h4>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{post.timeRead} min</span>
            <span>•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{post.summary}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.categories.map((cat) => (
          <span
            key={cat.name}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
          >
            {cat.name}
          </span>
        ))}
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
      >
        Read More
        <svg
          className="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  </article>
);
const FeaturedPosts = async () => {
  //   const featuredPosts: BlogPost[] = [
  //     {
  //       id: "1",
  //       title: "Building Scalable Applications with Next.js 14",
  //       excerpt:
  //         "Explore the latest features in Next.js 14 and learn how to build high-performance web applications",
  //       date: "2025-02-15",
  //       readTime: "8 min read",
  //       category: "Development",
  //       image: "/api/placeholder/800/600",
  //       author: {
  //         name: "Alex Mitchell",
  //         avatar: "/api/placeholder/40/40",
  //       },
  //       tags: ["Next.js", "React", "Performance"],
  //     },
  //     {
  //       id: "2",
  //       title: "Modern UI Design Trends for 2025",
  //       excerpt:
  //         "Discover the latest UI design trends shaping the future of web interfaces",
  //       date: "2025-02-14",
  //       readTime: "6 min read",
  //       category: "Design",
  //       image: "/api/placeholder/800/600",
  //       author: {
  //         name: "Sarah Chen",
  //         avatar: "/api/placeholder/40/40",
  //       },
  //       tags: ["UI/UX", "Design Trends", "Web Design"],
  //     },
  //     {
  //       id: "3",
  //       title: "Advanced State Management Patterns",
  //       excerpt:
  //         "Deep dive into modern state management solutions for complex applications",
  //       date: "2025-02-13",
  //       readTime: "12 min read",
  //       category: "Development",
  //       image: "/api/placeholder/800/600",
  //       author: {
  //         name: "James Wilson",
  //         avatar: "/api/placeholder/40/40",
  //       },
  //       tags: ["Redux", "Zustand", "State Management"],
  //     },
  //   ];
  const featuredPosts: ResponseType = await getPosts({
    limit: 3,
    recent: true,
  });

  if (!featuredPosts.success || !featuredPosts.data) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Articles
          </h2>
          <p className="text-xl text-gray-600">
            Failed to load featured posts.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-600">
              Hand-picked content to keep you inspired and informed
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Articles
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.data.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
