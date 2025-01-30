"use client"
import { useState, useEffect } from "react"

export interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
  role: "USER" | "ADMIN" | "AUTHOR"
  accountStatus: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED"
  providerProfileImage: string
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

interface InteractiveTableProps {
  users: User[]
  EditUserDialog: React.FC<{ user: any; onClose: () => void  ; setRefresh: React.Dispatch<React.SetStateAction<boolean>>;}>
  usersPerPage: number
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}



const InteractiveTable: React.FC<InteractiveTableProps> = ({
  filteredUsers,
  EditUserDialog,
  usersPerPage,
  setRefresh,
  children
}) => {
 
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setIsDialogOpen(true)
  }


 const data = {
  header:[
    "Image",
    "Name",
    "Email",
    "Role",
    "Status",
    "Email Verified",
    "Actions"
  ],
  body:[

  ]
}



  return (
    <div className="mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      {/* <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
      </div> */}
      {children}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {
              data.header.map((header, index)=>(
                <th className="py-3 px-6 text-left" key={index}>{header}</th>
              ))
            }
            
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentUsers.map((user) => (
              <tr key={user.userId} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <img
                    src={user.providerProfileImage || "/placeholder.svg"}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-3 px-6 text-left">{`${user.firstName} ${user.lastName}`}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${user.role === "ADMIN" ? "bg-purple-200 text-purple-800" : "bg-yellow-200 text-yellow-800"}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${user.accountStatus === "ACTIVE" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                  >
                    {user.accountStatus}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${user.accountStatus ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                  >
                    {user.isEmailVerified ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => handleEdit(user)}
                      className="transform hover:text-blue-500 hover:scale-110 transition duration-300 ease-in-out mr-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => {}}
                      className="transform hover:text-red-500 hover:scale-110 transition duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0 text-sm text-gray-600">
          Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length}{" "}
          entries
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-blue-100"
              } transition duration-300 ease-in-out`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
      {isDialogOpen && editingUser && (
        <EditUserDialog user={editingUser} onClose={() => setIsDialogOpen(false)} setRefresh ={setRefresh}/>
      )}
    </div>
  )
}

export default InteractiveTable
