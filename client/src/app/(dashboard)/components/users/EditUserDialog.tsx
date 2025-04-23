// import { useState } from "react";
// import { updateUser } from "../../dashboard/users/actions";
// import { showToast } from "@/features/ToastNotification/useToast";
// export interface User {
//   userId: string;
//   role: string;
//   accountStatus: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";
//   isEmailVerified: boolean;
//   providerProfileImage: string;
// }

// interface EditUserDialogProps {
//   user: User;
//   setRefresh:React.Dispatch<React.SetStateAction<boolean>>;
//   onClose: () => void;
// }

// const EditUserDialog: React.FC<EditUserDialogProps> = ({
//   user,
//  setRefresh,
//   onClose,
// }) => {
//   const [editedUser, setEditedUser] = useState<User>(user);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setEditedUser((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
//       <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h2>
//         <form
//           className="space-y-4"
//           action={async (formData) => {
//             const res = await updateUser(formData, user.userId);
//             if (res.success) {
//               showToast("success", res.message || "Success");
//             } else {
//               showToast("error", res.error?.message || "Something went wrong");
//             }
//             onClose();
//             setRefresh((prev) => !prev);
//           }}
//         >
//           <div>
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Role
//             </label>
//             <select
//               id="role"
//               name="role"
//               value={editedUser.role}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="USER">User</option>
//               <option value="ADMIN">Admin</option>
//               <option value="AUTHOR">Author</option>
//             </select>
//           </div>
//           <div>
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email Verified
//             </label>
//             <select
//               id="isEmailVerified"
//               name="isEmailVerified"
//               value={editedUser.isEmailVerified ? "Yes" : "No"}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </select>
//           </div>
//           <div>
//             <label
//               htmlFor="status"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Status
//             </label>
//             <select
//               id="status"
//               name="status"
//               value={editedUser.accountStatus}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="ACTIVE">ACTIVE</option>
//               <option value="INACTIVE">INACTIVE</option>
//               <option value="PENDING">PENDING</option>
//               <option value="SUSPENDED">SUSPENDED</option>
//             </select>
//           </div>
//           <div className="flex justify-end space-x-4 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditUserDialog;
import { useState } from "react";
import { updateUser } from "../../dashboard/users/actions";
import { showToast } from "@/features/ToastNotification/useToast";

export interface User {
  userId: string;
  role: string;
  accountStatus: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";
  isEmailVerified: boolean;
  providerProfileImage: string;
}

interface EditUserDialogProps {
  user: User;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  user,
  setRefresh,
  onClose,
}) => {
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "isEmailVerified") {
      setEditedUser((prev) => ({
        ...prev,
        isEmailVerified: value === "Yes",
      }));
    } else {
      setEditedUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-xl transition-colors">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Edit User
        </h2>
        <form
          className="space-y-4"
          action={async (formData) => {
            const res = await updateUser(formData, user.userId);
            if (res.success) {
              showToast("success", res.message || "Success");
            } else {
              showToast("error", res.error?.message || "Something went wrong");
            }
            onClose();
            setRefresh((prev) => !prev);
          }}
        >
          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="AUTHOR">Author</option>
            </select>
          </div>

          {/* Email Verified */}
          <div>
            <label
              htmlFor="isEmailVerified"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Email Verified
            </label>
            <select
              id="isEmailVerified"
              name="isEmailVerified"
              value={editedUser.isEmailVerified ? "Yes" : "No"}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="accountStatus"
              value={editedUser.accountStatus}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="PENDING">PENDING</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
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
  );
};

export default EditUserDialog;
