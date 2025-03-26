// import dynamic from "next/dynamic";
// import Image from "next/image";
// import Link from "next/link";

// const PopularCategories = dynamic(
//   () => import("@/components/landingpage/PopularCategories"),
//   {
//     loading: () => <p>Loading...</p>,
//   }
// );
// const FeaturedPosts = dynamic(
//   () => import("@/components/landingpage/FeaturedPosts"),
//   {
//     loading: () => <p>Loading...</p>,
//   }
// );
// const Subscribe = dynamic(() => import("@/components/Subscribe"), {
//   loading: () => <p>Loading...</p>,
// });
// const DefaultLayout = dynamic(() => import("@/components/DefaultLayout"), {
//   loading: () => <p>Loading...</p>,
// });
// export default function Home() {
//   return (
//     <DefaultLayout>
//       {/* Hero Section */}
//       <section className="relative min-h-screen bg-gray-900 dark:bg-gray-800 flex items-center">
//         <div className="absolute inset-0">
//           {/* Background Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent z-10" />

//           {/* Light Mode Grid */}
//           <Image
//             src="/images/grids/grid-01.svg"
//             alt="Hero background"
//             fill
//             className="object-cover hidden dark:block"
//             priority
//           />

//           {/* Dark Mode Grid */}
//           <Image
//             src="/images/grids/grid-light.png"
//             alt="Hero background"
//             fill
//             className="object-cover block dark:hidden"
//             priority
//           />

//           {/* Additional Overlay for better contrast in both modes */}
//           <div className="absolute inset-0 bg-black/50 dark:bg-black/30" />
//         </div>

//         <div className="relative z-20 container mx-auto px-4">
//           <div className="max-w-4xl">
//             <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full text-blue-300 mb-6">
//               <span className="animate-pulse mr-2">🔥</span>
//               Latest in Tech & Development
//             </div>

//             {/* Heading with better contrast for both light/dark */}
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
//               Explore the Future of
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//                 {" "}
//                 Web Development
//               </span>
//             </h1>

//             {/* Text with softer contrast for readability */}
//             <p className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed">
//               Deep dive into cutting-edge web technologies, design patterns, and
//               industry best practices. Stay ahead of the curve with our expert
//               insights and tutorials.
//             </p>

//             {/* Buttons with consistent color changes for both modes */}
//             <div className="flex flex-wrap gap-4">
//               <Link
//                 href="/blog"
//                 className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
//               >
//                 Explore Articles
//               </Link>
//               <Link
//                 href="#subscribe"
//                 className="px-8 py-4 bg-white/10 text-white rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
//               >
//                 Subscribe to Newsletter
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Bouncing arrow */}
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
//           <svg
//             className="w-6 h-6 text-white"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 14l-7 7m0 0l-7-7m7 7V3"
//             />
//           </svg>
//         </div>
//       </section>

//       {/* Featured Posts */}
//       <FeaturedPosts />

//       {/* Categories */}
//       <section className="py-24 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
//             Explore Topics
//           </h2>
//           <PopularCategories />
//         </div>
//       </section>

//       <Subscribe />
//     </DefaultLayout>
//   );
// }
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Sparkles, Code, Zap } from "lucide-react";

const PopularCategories = dynamic(
  () => import("@/components/landingpage/PopularCategories"),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse" />
    ),
  }
);

const FeaturedPosts = dynamic(
  () => import("@/components/landingpage/FeaturedPosts"),
  {
    loading: () => (
      <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" />
    ),
  }
);

const Subscribe = dynamic(() => import("@/components/Subscribe"), {
  loading: () => (
    <div className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse" />
  ),
});

const DefaultLayout = dynamic(() => import("@/components/DefaultLayout"), {
  loading: () => <div className="min-h-screen bg-gray-100 dark:bg-gray-900" />,
});
import { Rocket, Book, ChevronDown } from "lucide-react";
export default function Home() {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[size:50px_50px] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]" />
        </div>

        {/* Abstract Accent Elements */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl" />

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 py-12 lg:py-0">
          <div className="max-w-5xl mx-auto">
            {/* Feature Badge */}
            <div className="inline-flex items-center mb-8 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full backdrop-blur-sm mx-auto sm:mx-0">
              <Rocket className="mr-2 text-indigo-400" size={18} />
              <span className="text-indigo-300 font-medium">
                Accelerate Your Tech Journey
              </span>
            </div>

            {/* Main Headline - Responsive text sizing */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight text-center sm:text-left">
              <span className="block text-white mb-2">
                Master Digital Craftsmanship
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Through Innovative Learning
              </span>
            </h1>

            {/* Subheadline with better line height for readability */}
            <p className="text-lg md:text-xl mb-12 text-slate-300 max-w-2xl mx-auto sm:mx-0 text-center sm:text-left leading-relaxed">
              Explore cutting-edge technologies, design principles, and
              transformative learning experiences that elevate your skills to
              the next level.
            </p>

            {/* Call to Action Buttons - Stack on mobile, side by side on larger screens */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-16 sm:mb-0 mx-auto sm:mx-0 text-center sm:text-left">
              <Link
                href="/courses"
                className="flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/20"
              >
                <Book className="mr-2" size={20} /> Explore Courses
              </Link>
              <Link
                href="/blog"
                className="flex items-center justify-center px-8 py-4 bg-slate-800 border border-slate-700 text-white rounded-lg font-medium hover:bg-slate-700 transition-all duration-300"
              >
                <Rocket className="mr-2" size={20} /> Start Learning
              </Link>
            </div>
          </div>
        </div>

        {/* More subtle, professional scroll indicator */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="flex flex-col items-center">
            <span className="text-sm text-slate-400 mb-2">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-scroll-down mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay ahead of the curve with our curated collection of
              cutting-edge articles and tutorials.
            </p>
          </div>
          <FeaturedPosts />
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Tech Domains
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover a wide range of topics from frontend frameworks to
              backend architectures and everything in between.
            </p>
          </div>
          <PopularCategories />
        </div>
      </section>

      {/* Newsletter Section */}
      <Subscribe />
    </DefaultLayout>
  );
}
