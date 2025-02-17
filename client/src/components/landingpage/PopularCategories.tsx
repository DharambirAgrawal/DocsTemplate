// Popular Categories Component with hover effects
// import { getCategories } from '@/lib/publicActions';
import { getCategories } from "@/app/(blog)/components/actions";
import Link from "next/link";
interface CategoryProps {
  success: boolean;
  message?: string;
  data?: {
    name: string;
    postCount: number;
    slug: string;
  }[];
}

const colors = [
  "bg-blue-100 hover:bg-blue-200",
  "bg-green-100 hover:bg-green-200",
  "bg-purple-100 hover:bg-purple-200",
  "bg-yellow-100 hover:bg-yellow-200",
  "bg-red-100 hover:bg-red-200",
  "bg-indigo-100 hover:bg-indigo-200",
  "bg-pink-100 hover:bg-pink-200",
  "bg-gray-100 hover:bg-gray-200",
];

const PopularCategories = async () => {
  const categories: CategoryProps = await getCategories({});
  if (
    !categories.success ||
    categories.data?.length === 0 ||
    !categories.data
  ) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
          <div className="text-center text-red-500">
            Failed to load categories
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.data.map((category, index) => (
        <Link
          key={index}
          href={`/category/${category.slug}`}
          className={`${
            colors[index % colors.length]
          } rounded-lg p-4 cursor-pointer transition-all duration-300 transform hover:scale-105`}
        >
          <div className="text-lg font-semibold mb-2">{category.name}</div>
          <div className="text-gray-600">{category.postCount} posts</div>
        </Link>
      ))}
    </div>
  );
};
export default PopularCategories;
