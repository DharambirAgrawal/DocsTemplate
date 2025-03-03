"use client";

import { useState } from "react";

type Person = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function DraggableTable({
  onedit,
  ondelete,
  course,
}: {
  onedit: (sectionId: any) => void;
  ondelete: (sectionId: any) => void;
  course: any;
}) {
  const [courseContents, setCourseContents] = useState(course);
  // const [people, setPeople] = useState<Person[]>([
  //   {
  //     id: "1",
  //     name: "John Doe",
  //     email: "john@example.com",
  //     role: "Developer",
  //   },
  //   {
  //     id: "2",
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     role: "Designer",
  //   },
  //   {
  //     id: "3",
  //     name: "Bob Johnson",
  //     email: "bob@example.com",
  //     role: "Manager",
  //   },
  //   {
  //     id: "4",
  //     name: "Alice Williams",
  //     email: "alice@example.com",
  //     role: "Product Owner",
  //   },
  //   {
  //     id: "5",
  //     name: "Charlie Brown",
  //     email: "charlie@example.com",
  //     role: "QA Engineer",
  //   },
  // ]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("draggedIndex", index.toString());
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    const reorderedPeople = [...courseContents];

    // Remove the dragged item from its original position
    const draggedPerson = reorderedPeople.splice(draggedIndex, 1)[0];

    // Insert the dragged item into the new position
    reorderedPeople.splice(index, 0, draggedPerson);

    setCourseContents(reorderedPeople);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  console.log(courseContents);

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">Team Members</h2>
      <div className="overflow-hidden border rounded-lg">
        <div className="min-w-full divide-y divide-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Render the table rows */}
              {courseContents?.map((section, index) => (
                <tr
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                >
                  <td
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className="flex justify-center items-center border border-dashed border-gray-300 p-2 cursor-move"
                  >
                    {/* The drop area */}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {section.sectionTitle}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {section.sectionContent.substring(0, 50)}...
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {section.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onedit(section)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => ondelete(section._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
