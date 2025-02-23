"use client";
import { useState, useEffect } from "react";
import UsersTable from "../../components/users/UserTable";
import EditUserDialog from "../../components/users/EditUserDialog";
import { getUsers } from "./actions";
import { UserType } from "../../components/users/types";
export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [refresh, setRefresh] = useState(false);

  const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "INACTIVE" | "ACTIVE" | "PENDING" | "SUSPENDED"
  >("all");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "ADMIN" | "USER" | "AUTHOR"
  >("all");

  const [filter, setFilter] = useState({
    pagination: {
      currentPage: 1,
      pageLimit: 10,
      totalPage: 1,
      totalUsers: 1,
    },
  });

  useEffect(() => {
    let filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.accountStatus === statusFilter);
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users, statusFilter, roleFilter]);

  useEffect(() => {
    const gettingUsers = async () => {
      const users = await getUsers();
      setUsers(users.data);
    };
    gettingUsers();
  }, [refresh]);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user.userId !== userId));
  };

  return (
    <div className="md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      {/* <UserTable /> */}
      <div className="mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
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
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as
                    | "all"
                    | "INACTIVE"
                    | "ACTIVE"
                    | "PENDING"
                    | "SUSPENDED"
                )
              }
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
              onChange={(e) =>
                setRoleFilter(
                  e.target.value as "all" | "ADMIN" | "USER" | "AUTHOR"
                )
              }
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
              <option value="AUTHOR">Author</option>
            </select>
          </div>
        </div>

        <UsersTable
          currentBody={filteredUsers}
          action={true}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 text-sm text-gray-600">
            Showing {indexOfFirstUser + 1} to{" "}
            {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
            {filteredUsers.length} entries
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 hover:bg-blue-100"
                  } transition duration-300 ease-in-out`}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>
        {isDialogOpen && editingUser && (
          <EditUserDialog
            user={editingUser}
            onClose={() => setIsDialogOpen(false)}
            setRefresh={setRefresh}
          />
        )}
      </div>
    </div>
  );
}
