import { getCategories } from '@/lib/publicActions';
import Link from 'next/link';
interface TopicProp {
  status: 'error' | 'success';
  data: {
    name: string;
    count: string;
    slug: string;
  }[];
}
const Topics = async () => {
  const topics: TopicProp = await getCategories({ limit: 3 });

  return (
    <div className="space-y-2">
      {topics.data.map((topic, index) => (
        <Link
          href={`/category/${topic.slug}`}
          key={index}
          className="flex justify-between items-center py-2 rounded-lg group cursor-pointer transition-colors"
        >
          <span className="text-sm sm:text-base text-gray-700 capitalize">
            {topic.name}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 border group-hover:bg-blue-500 border-gray-200 px-2 py-0.5 rounded-full">
            {topic.count}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Topics;