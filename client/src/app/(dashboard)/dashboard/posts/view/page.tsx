import UserTable from "@/app/(dashboard)/components/users/UserTable"
import { getPosts } from "../actions"
export default async function PostsPage() {

const posts = await getPosts({});

  if (!posts.success) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">Posts not found</h2>
        <p className="text-gray-600">Please try again or contact support if the problem persists.</p>
      </div>
    );
  }

  if(posts.data.length === 0) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">No posts found</h2>
        <p className="text-gray-600">Please create posts to view them here.</p>
      </div>
    );
  }

  return (
    <div className="md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      <UserTable />
    </div>
  )
}

