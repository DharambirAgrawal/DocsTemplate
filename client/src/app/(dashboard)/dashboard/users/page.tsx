"use client";
import { useState, useEffect } from "react";
import InteractiveTable from "@/components/Tables/InteractiveTable";
import InteractiveTable2 from "@/components/Tables/InteractiveTable2";
import EditUserDialog from "../../components/users/EditUserDialog";
import { getUsers } from "./actions";
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "USER" | "ADMIN" | "AUTHOR";
  accountStatus: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";
  providerProfileImage: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState(false);

   const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [statusFilter, setStatusFilter] = useState<"all" | "INACTIVE" | "ACTIVE" | "PENDING" | "SUSPENDED">("all")
    const [roleFilter, setRoleFilter] = useState<"all" | "ADMIN" | "USER" | "AUTHOR">("all")
  
    const [filter, setFilter] = useState()
  
    useEffect(() => {
      let filtered = users.filter((user) =>
        Object.values(user).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      )
  
      if (statusFilter !== "all") {
        filtered = filtered.filter((user) => user.accountStatus === statusFilter)
      }
  
      if (roleFilter !== "all") {
        filtered = filtered.filter((user) => user.role === roleFilter)
      }
      setFilteredUsers(filtered)
      setCurrentPage(1)
    }, [searchTerm, users, statusFilter, roleFilter])
  

  useEffect(() => {
    const gettingUsers = async () => {
      const users = await getUsers();
      console.log(users);
      setUsers(users);
    };
    gettingUsers();
  }, [refresh]);

  return (
    <div className="md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      {/* <UserTable /> */}
      <InteractiveTable
        users={users}
        EditUserDialog={EditUserDialog}
        setRefresh={setRefresh}
        usersPerPage={10}
      />
      <InteractiveTable2
        users={users}
        EditUserDialog={EditUserDialog}
        setRefresh={setRefresh}
        usersPerPage={10}
      >
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full md:w-1/3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "INACTIVE" | "ACTIVE" | "PENDING" | "SUSPENDED")}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>

          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as "all" | "ADMIN" | "USER" | "AUTHOR")}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
            <option value="AUTHOR">Author</option>
          </select>
        </div>
      </div>
        </InteractiveTable2>
    </div>
  );
}
