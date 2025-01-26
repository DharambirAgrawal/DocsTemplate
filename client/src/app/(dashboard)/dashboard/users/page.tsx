'use client'
import { useState, useEffect } from "react"
import InteractiveTable from "@/components/Tables/InteractiveTable"
import EditUserDialog from "../../components/users/EditUserDialog"
import { getUsers } from "./actions"
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  accountStatus: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED"
  providerProfileImage: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])

  const handleSave = (updatedUser: User) => {
    setUsers(users.map((user) => (user.userId === updatedUser.userId ? updatedUser : user)))
  }

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user.userId !== userId))
  }


  useEffect(() => {
    const gettingUsers = async () => {

      const users = await getUsers();
      console.log(users);
      setUsers(users);
  
    };
    gettingUsers();
  }, []);


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

