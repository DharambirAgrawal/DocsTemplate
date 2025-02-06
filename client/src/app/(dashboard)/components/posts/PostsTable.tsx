"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  Edit2,
  Trash2,
  Eye,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getPosts } from "../../dashboard/posts/actions";
import { PostType } from "./types";
import EditPostDialog from "./EditPostsTable";

type SortConfig = {
  key: keyof PostType | "author.email" | "categories" | "tags" | "metaTitle" | null;
  direction: "asc" | "desc";
};

type FilterConfig = {
  title: string;
  author: string;
  category: string;
  tag: string;
  status: "all" | "published" | "draft";
};

const PostsTable = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "desc" });
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    title: "",
    author: "",
    category: "",
    tag: "",
    status: "all",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [editingUser, setEditingUser] = useState<PostType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts({});
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);
  const handleEdit = (user: PostType) => {
    setEditingUser(user)
    setIsDialogOpen(true)
  }

  const sortedAndFilteredPosts = useMemo(() => {
    let filteredPosts = [...posts];

    filteredPosts = filteredPosts.filter((post) => {
      const matchesTitle = post.title.toLowerCase().includes(filterConfig.title.toLowerCase());
      const matchesAuthor = post.author.email.toLowerCase().includes(filterConfig.author.toLowerCase());
      const matchesCategory =
        filterConfig.category === "" ||
        post.categories.some((cat) =>
          cat.name.toLowerCase().includes(filterConfig.category.toLowerCase())
        );
      const matchesTag =
        filterConfig.tag === "" ||
        post.tags.some((tag) =>
          tag.name.toLowerCase().includes(filterConfig.tag.toLowerCase())
        );
      const matchesStatus =
        filterConfig.status === "all" ||
        (filterConfig.status === "published" && new Date(post.publishedAt) <= new Date()) ||
        (filterConfig.status === "draft" && new Date(post.publishedAt) > new Date());

      return matchesTitle && matchesAuthor && matchesCategory && matchesTag && matchesStatus;
    });

    if (sortConfig.key) {
      filteredPosts.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        // Handle nested and computed keys
        if (sortConfig.key.includes(".")) {
          if (sortConfig.key === "author.email") {
            aValue = a.author.email;
            bValue = b.author.email;
          }
        } else if (sortConfig.key === "categories") {
          aValue = a.categories.map((c) => c.name).join(",");
          bValue = b.categories.map((c) => c.name).join(",");
        } else if (sortConfig.key === "tags") {
          aValue = a.tags.map((t) => t.name).join(",");
          bValue = b.tags.map((t) => t.name).join(",");
        } else if (sortConfig.key === "metaTitle") {
          // Use the metaTitle from the first metaData object if available
          aValue = a.metaData[0]?.metaTitle || "";
          bValue = b.metaData[0]?.metaTitle || "";
        } else {
          aValue = a[sortConfig.key as keyof PostType];
          bValue = b[sortConfig.key as keyof PostType];
        }

        if (typeof aValue === "string") aValue = aValue.toLowerCase();
        if (typeof bValue === "string") bValue = bValue.toLowerCase();

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filteredPosts;
  }, [posts, sortConfig, filterConfig]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return sortedAndFilteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [sortedAndFilteredPosts, currentPage]);

  const totalPages = Math.ceil(sortedAndFilteredPosts.length / postsPerPage);

  const handleSort = (key: SortConfig["key"]) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const SortIcon = ({ columnKey }: { columnKey: SortConfig["key"] }) => {
    if (sortConfig.key !== columnKey)
      return <ChevronDown className="w-4 h-4 opacity-20" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const handleDelete = (slug: string) => {
    // Implement your delete functionality here
    console.log("Deleting post with slug:", slug);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      {/* Filters Section */}
      <div className="p-4 border-b">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterConfig.title}
                onChange={(e) =>
                  setFilterConfig((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Filter by author..."
              className="px-4 py-2 border rounded-lg"
              value={filterConfig.author}
              onChange={(e) =>
                setFilterConfig((prev) => ({ ...prev, author: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Filter by category..."
              className="px-4 py-2 border rounded-lg"
              value={filterConfig.category}
              onChange={(e) =>
                setFilterConfig((prev) => ({ ...prev, category: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Filter by tag..."
              className="px-4 py-2 border rounded-lg"
              value={filterConfig.tag}
              onChange={(e) =>
                setFilterConfig((prev) => ({ ...prev, tag: e.target.value }))
              }
            />
            <select
              className="px-4 py-2 border rounded-lg"
              value={filterConfig.status}
              onChange={(e) =>
                setFilterConfig((prev) => ({
                  ...prev,
                  status: e.target.value as FilterConfig["status"],
                }))
              }
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {/* Title Column (with image thumbnail) */}
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("title")}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                >
                  Title <SortIcon columnKey="title" />
                </button>
              </th>
              {/* Summary */}
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Summary
              </th>
              {/* Author */}
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("author.email")}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                >
                  Author <SortIcon columnKey="author.email" />
                </button>
              </th>
              {/* Categories */}
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("categories")}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                >
                  Categories <SortIcon columnKey="categories" />
                </button>
              </th>
              {/* Tags */}
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("tags")}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                >
                  Tags <SortIcon columnKey="tags" />
                </button>
              </th>
             
              {/* Meta Title */}
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("metaTitle")}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                >
                  Meta Title <SortIcon columnKey="metaTitle" />
                </button>
              </th>
               {/* Meta Description */}
               <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("metaDesc")}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                >
                  Meta Description <SortIcon columnKey="metaDesc" />
                </button>
              </th>
               {/* Meta Image */}
               <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("metaImage")}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                >
                  Meta Image <SortIcon columnKey="metaImage" />
                </button>
              </th>
               {/* Meta Title */}
               <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("metaKeywords")}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                >
                  Meta Keywords <SortIcon columnKey="metaKeywords" />
                </button>
              </th>
              {/* Published */}
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("publishedAt")}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                >
                  Published <SortIcon columnKey="publishedAt" />
                </button>
              </th>
              {/* Actions */}
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedPosts.map((post) => (
              <tr key={post.slug} className="hover:bg-gray-50">
                {/* Title with thumbnail */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                    </div>
                  </div>
                </td>
                {/* Summary */}
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-500 line-clamp-2">{post.summary}</p>
                </td>
                {/* Author */}
                <td className="px-6 py-4">
                  <div>\n                    <p className="text-sm font-medium text-gray-900">{`${post.author.firstName} ${post.author.lastName}`}</p>\n                    <p className="text-sm text-gray-500">{post.author.email}</p>\n                  </div>
                </td>
                {/* Categories */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category) => (
                      <span
                        key={category.slug}
                        className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </td>
                {/* Tags */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.slug}
                        className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </td>
                {/* Meta Title */}
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">
                    {post.metaData[0]?.metaTitle || "-"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">
                    {post.metaData.metaTitle || "-"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">
                    {post.metaData.metaTitle || "-"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">
                    {post.metaData[0]?.metaTitle || "-"}
                  </span>
                </td>
                {/* Published Date */}
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </span>
                </td>
                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                       onClick={() => handleEdit(post)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => console.log("View", post.slug)}
                      className="p-1 text-gray-600 hover:text-gray-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 flex items-center justify-between border-t">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * postsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * postsPerPage, sortedAndFilteredPosts.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium">{sortedAndFilteredPosts.length}</span>{" "}
              results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === page
                      ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  } ${page === 1 ? "rounded-l-md" : ""} ${
                    page === totalPages ? "rounded-r-md" : ""
                  }`}
                >
                  {page}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {isDialogOpen && editingUser && (
        <EditPostDialog post={editingUser} onClose={() => setIsDialogOpen(false)} />
      )}
    </div>
  );
};

export default PostsTable;
