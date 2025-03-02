"use client";

import { useState } from "react";

type Person = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function DraggableTable() {
  const [people, setPeople] = useState<Person[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Designer",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Manager",
    },
    {
      id: "4",
      name: "Alice Williams",
      email: "alice@example.com",
      role: "Product Owner",
    },
    {
      id: "5",
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "QA Engineer",
    },
  ]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("draggedIndex", index.toString());
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    const reorderedPeople = [...people];

    // Remove the dragged item from its original position
    const draggedPerson = reorderedPeople.splice(draggedIndex, 1)[0];

    // Insert the dragged item into the new position
    reorderedPeople.splice(index, 0, draggedPerson);

    setPeople(reorderedPeople);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">Team Members</h2>
      <div className="overflow-hidden border rounded-lg">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-gray-50">
            <div className="grid grid-cols-5 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              <div className="text-center">Drop</div>
              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Actions</div>
            </div>
          </div>
          <div className="bg-white divide-y divide-gray-200">
            {people.map((person, index) => (
              <div
                key={person.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                className="grid grid-cols-5 px-6 py-4 text-sm text-gray-800 transition-colors hover:bg-gray-50 active:bg-gray-100"
              >
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="flex justify-center items-center border border-dashed border-gray-300 p-2 cursor-move"
                >
                  {/* The drop area */}
                </div>
                <div className="font-medium">{person.name}</div>
                <div>{person.email}</div>
                <div>{person.role}</div>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                    Drag to reorder
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 mt-4 bg-gray-50 rounded-lg">
        <h3 className="mb-2 font-medium">Current Order (IDs):</h3>
        <pre className="p-2 overflow-x-auto text-sm bg-gray-100 rounded">
          {JSON.stringify(
            people.map((p) => ({ id: p.id, name: p.name })),
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
