import UserTable from "../../components/users/UserTable"
export default function UsersPage() {
  return (
    <div className="md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      <UserTable />
    </div>
  )
}

