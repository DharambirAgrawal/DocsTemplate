import { useState } from "react"
export interface User {
    userId: string
    role: string
    accountStatus: "ACTIVE" | "INACTIVE" | "PENDING"
    isEmailVerified: boolean
    status: "active" | "inactive"
    providerProfileImage: string
  }
  
  
  

interface EditUserDialogProps {
  user: User
  onSave: (updatedUser: User) => void
  onClose: () => void
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user, onSave, onClose }) => {
  const [editedUser, setEditedUser] = useState<User>(user)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedUser)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
         
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="AUTHOR">Author</option>
            </select>
          </div>
          <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Email Verified
          </label>
          <select
            id="isEmailVerified"
            name="isEmailVerified"
            value={editedUser.isEmailVerified ? "Yes" : "No"}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          
          </select>
        </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={editedUser.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="active">ACTIVE</option>
              <option value="inactive">INACTIVE</option>
              <option value="inactive">PENDING</option>
              <option value="inactive">SUSPENDED</option>

            </select>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={editedUser.providerProfileImage}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUserDialog

