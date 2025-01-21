'use client'
import { useState } from "react"
import InteractiveTable from "@/components/Tables/InteractiveTable"
import EditUserDialog from "../../components/users/EditUserDialog"
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  status: "active" | "inactive"
  image: string
}
 export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    firstName: `First${i + 1}`,
    lastName: `Last${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "Admin" : "User",
    status: i % 5 === 0 ? "inactive" : "active",
    image: `https://picsum.photos/seed/${i + 1}/40/40`,
  }))
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)

  const handleSave = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
  }

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }
  return (
    <div className="md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      {/* <UserTable /> */}
      <InteractiveTable
      users={users}
      EditUserDialog={EditUserDialog}
      usersPerPage={10}
      onSave={handleSave}
      onDelete={handleDelete}
    />
    </div>
  )
}

