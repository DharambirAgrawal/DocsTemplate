import UserTable from "@/app/(dashboard)/components/users/UserTable"
import { getPosts } from "../actions"
export default async function UsersPage() {

const posts = await getPosts();
console.log(posts);

  return (
    <div className="md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      <UserTable />
    </div>
  )
}

