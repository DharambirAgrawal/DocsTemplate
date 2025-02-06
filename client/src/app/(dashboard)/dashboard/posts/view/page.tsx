import PostsTable from "@/app/(dashboard)/components/posts/PostsTable";
export default async function PostsPage() {


  return (
    <div className="md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Post Management</h1>
      <PostsTable/>
    </div>
  )
}

