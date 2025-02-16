"use client";
import DefaultLayout from "@/components/DefaultLayout";
import Image from "next/image";
import Link from "next/link";
import Subscribe from "@/components/Suscribe";
import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
}

interface Category {
  name: string;
  icon: string;
  count: number;
  color: string;
}

const categories: Category[] = [
  {
    name: "Development",
    icon: "💻",
    count: 24,
    color: "from-purple-500 to-blue-500",
  },
  { name: "Design", icon: "🎨", count: 18, color: "from-pink-500 to-rose-500" },
  {
    name: "DevOps",
    icon: "⚙️",
    count: 12,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Career",
    icon: "🚀",
    count: 15,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "AI & ML",
    icon: "🤖",
    count: 20,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Web3",
    icon: "⛓️",
    count: 8,
    color: "from-indigo-500 to-purple-500",
  },
];

const featuredPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Applications with Next.js 14",
    excerpt:
      "Explore the latest features in Next.js 14 and learn how to build high-performance web applications",
    date: "2025-02-15",
    readTime: "8 min read",
    category: "Development",
    image: "/api/placeholder/800/600",
    author: {
      name: "Alex Mitchell",
      avatar: "/api/placeholder/40/40",
    },
    tags: ["Next.js", "React", "Performance"],
  },
  {
    id: "2",
    title: "Modern UI Design Trends for 2025",
    excerpt:
      "Discover the latest UI design trends shaping the future of web interfaces",
    date: "2025-02-14",
    readTime: "6 min read",
    category: "Design",
    image: "/api/placeholder/800/600",
    author: {
      name: "Sarah Chen",
      avatar: "/api/placeholder/40/40",
    },
    tags: ["UI/UX", "Design Trends", "Web Design"],
  },
  {
    id: "3",
    title: "Advanced State Management Patterns",
    excerpt:
      "Deep dive into modern state management solutions for complex applications",
    date: "2025-02-13",
    readTime: "12 min read",
    category: "Development",
    image: "/api/placeholder/800/600",
    author: {
      name: "James Wilson",
      avatar: "/api/placeholder/40/40",
    },
    tags: ["Redux", "Zustand", "State Management"],
  },
];

const PostCard = ({ post }: { post: BlogPost }) => (
  <article className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative h-64">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h4 className="text-sm font-medium text-gray-900">
            {post.author.name}
          </h4>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{post.readTime}</span>
            <span>•</span>
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
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
      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/blog/${post.id}`}
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

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gray-900 flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent z-10" />
          <Image
            src="/api/placeholder/1920/1080"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full text-blue-300 mb-6">
              <span className="animate-pulse mr-2">🔥</span>
              Latest in Tech & Development
            </div>
            <h1 className="text-6xl font-bold text-white mb-8 leading-tight">
              Explore the Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {" "}
                Web Development
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Deep dive into cutting-edge web technologies, design patterns, and
              industry best practices. Stay ahead of the curve with our expert
              insights and tutorials.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Explore Articles
              </Link>
              <Link
                href="/newsletter"
                className="px-8 py-4 bg-white/10 text-white rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Featured Posts */}
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
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Explore Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-2xl p-8 min-h-[200px] flex items-center justify-center"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`}
                />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                <div className="relative z-10 text-center">
                  <span className="text-4xl mb-4 block">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80">{category.count} Articles</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Subscribe />
    </DefaultLayout>
  );
}
