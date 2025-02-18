import DefaultLayout from "@/components/DefaultLayout";
import Image from "next/image";
import Link from "next/link";
import Subscribe from "@/components/Subscribe";
import FeaturedPosts from "@/components/landingpage/FeaturedPosts";
import PopularCategories from "@/components/landingpage/PopularCategories";

export default function Home() {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      {/* <section className="relative min-h-screen bg-gray-900 flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent z-10" />
          <Image
            src="/images/grids/grid-light.png"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[url('/images/grids/grid-01.svg')] opacity-20" />
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
                href="#subscribe"
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
      </section> */}
      <section className="relative min-h-screen bg-gray-900 dark:bg-gray-800 flex items-center">
        <div className="absolute inset-0">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent z-10" />

          {/* Light Mode Grid */}
          <Image
            src="/images/grids/grid-01.svg"
            alt="Hero background"
            fill
            className="object-cover hidden dark:block"
            priority
          />

          {/* Dark Mode Grid */}
          <Image
            src="/images/grids/grid-light.png"
            alt="Hero background"
            fill
            className="object-cover block dark:hidden"
            priority
          />

          {/* Additional Overlay for better contrast in both modes */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/30" />
        </div>

        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full text-blue-300 mb-6">
              <span className="animate-pulse mr-2">🔥</span>
              Latest in Tech & Development
            </div>

            {/* Heading with better contrast for both light/dark */}
            <h1 className="text-6xl font-bold text-white mb-8 leading-tight">
              Explore the Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {" "}
                Web Development
              </span>
            </h1>

            {/* Text with softer contrast for readability */}
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Deep dive into cutting-edge web technologies, design patterns, and
              industry best practices. Stay ahead of the curve with our expert
              insights and tutorials.
            </p>

            {/* Buttons with consistent color changes for both modes */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Explore Articles
              </Link>
              <Link
                href="#subscribe"
                className="px-8 py-4 bg-white/10 text-white rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>

        {/* Bouncing arrow */}
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
      <FeaturedPosts />

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Explore Topics
          </h2>
          <PopularCategories />
        </div>
      </section>

      <Subscribe />
    </DefaultLayout>
  );
}
