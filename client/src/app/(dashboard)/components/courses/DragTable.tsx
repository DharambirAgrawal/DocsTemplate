"use client";

import { useState, useEffect } from "react";

interface ContentType {
  _id: string;
  title: string;
  content: string;
  slug: string;
  order: number;
  metaData: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
  };
}

export default function DraggableTable({
  onedit,
  ondelete,
  course,
  onUpdateOrder,
}: {
  onedit: (sectionId: any) => void;
  ondelete: (sectionId: any) => void;
  course: any;
  onUpdateOrder?: (updatedContents: ContentType[]) => Promise<void>;
}) {
  const [courseContents, setCourseContents] = useState<ContentType[]>(course);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<string[]>([]);

  // Store the original order when component mounts
  useEffect(() => {
    setOriginalOrder(course.map((item: ContentType) => item._id));
  }, [course]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("draggedIndex", index.toString());
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    const reorderedContents = [...courseContents];

    // Remove the dragged item from its original position
    const draggedItem = reorderedContents.splice(draggedIndex, 1)[0];

    // Insert the dragged item into the new position
    reorderedContents.splice(index, 0, draggedItem);

    // Update order numbers
    const updatedContents = reorderedContents.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    setCourseContents(updatedContents);

    // Check if order has changed
    const currentOrder = updatedContents.map((item) => item._id);
    const hasOrderChanged = !originalOrder.every(
      (id, i) => id === currentOrder[i]
    );
    setIsOrderChanged(hasOrderChanged);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmitOrder = async () => {
    if (onUpdateOrder && isOrderChanged) {
      await onUpdateOrder(courseContents);
      setIsOrderChanged(false);
      setOriginalOrder(courseContents.map((item) => item._id));
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Course Sections
      </h2>
      <div className="overflow-hidden border border-gray-300 rounded-lg">
        <div className="min-w-full divide-y divide-gray-200">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Render the table rows */}
              {courseContents?.map((section, index) => (
                <tr
                  key={section._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                >
                  <td
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className="flex justify-center items-center border-r p-4 cursor-move"
                  >
                    <div className="text-sm text-gray-500">{section.order}</div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-800">
                      {section.title}
                    </div>
                    <div className="text-gray-600">
                      {section.content.slice(0, 50)}...
                    </div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                    {section.slug}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => onedit(section)}
                      className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => ondelete(section._id)}
                      className="ml-2 px-4 py-2 text-sm text-red-600 hover:text-red-800 rounded-md transition-colors"
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

      {/* Submit Order Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSubmitOrder}
          disabled={!isOrderChanged}
          className={`px-4 py-2 rounded-md transition-colors ${
            isOrderChanged
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isOrderChanged ? "Save New Order" : "Order Unchanged"}
        </button>
      </div>
    </div>
  );
}
