"use server";
import { validateEmail } from "@/lib/utils";

export async function subscribeEmailAction(prevState: any, formData: FormData) {
  const { email } = Object.fromEntries(formData);
  if (!email) {
    return {
      type: "error",
      content: "Email is required",
    };
  }

  if (!validateEmail(email as string)) {
    return {
      type: "error",
      content: "Invalid email",
    };
  }
  try {
    const res = await fetch(
      `${process.env.SERVER_BASE_URL}/api/user/newsletter/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    console.log(res);
    console.log(await res.json());
    if (!res.ok) {
      if (res.status === 400) {
        return {
          type: "error",
          content: "Email already subscribed",
        };
      }
      return {
        type: "error",
        content: "Subscription failed",
      };
    }

    return {
      type: "success",
      content: "Subscription successful",
    };
  } catch (err) {
    return {
      type: "error",
      content: "Subscription failed",
    };
  }

  // redirect('/dashboard')
}

enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

interface PostFilters {
  // Pagination
  page?: number;
  limit?: number;

  // Sorting
  sortBy?: string;
  order?: "asc" | "desc";

  // Filtering
  search?: string;
  categories?: string[];
  tags?: string[];
  status?: PostStatus;
  metaData?: boolean;
  startDate?: Date | string;
  endDate?: Date | string;
  featured?: boolean;
  recent?: boolean;
}

interface PostResponse {
  success: boolean;
  data?: any;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getPosts = async (
  filters: PostFilters = {}
): Promise<PostResponse> => {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();

    // Helper function to safely add params
    const addParam = (key: string, value: any) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(","));
        } else if (value instanceof Date) {
          queryParams.append(key, value.toISOString());
        } else {
          queryParams.append(key, String(value));
        }
      }
    };

    // Add all possible filter parameters
    const {
      page = 1,
      limit = 10,
      sortBy,
      order,
      search,
      categories,
      tags,
      status,
      startDate,
      endDate,
      featured,
      recent,
      metaData,
    } = filters;

    // Add pagination params
    addParam("page", page);
    addParam("limit", limit);

    // Add sorting params
    addParam("sortBy", sortBy);
    addParam("order", order);

    // Add filtering params
    addParam("search", search);
    addParam("categories", categories);
    addParam("tags", tags);
    addParam("status", status);
    addParam("metaData", metaData);
    addParam("startDate", startDate);
    addParam("endDate", endDate);
    addParam("featured", featured);
    addParam("recent", recent);

    // Build the URL with query parameters
    const url = `${
      process.env.SERVER_BASE_URL
    }/api/blog/public/posts?${queryParams.toString()}`;

    // Make the request with error handling
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add credentials if needed
      // credentials: 'include',
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        message: errorData?.message || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to fetch posts",
      };
    }

    return {
      success: true,
      data: data.data,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

// Example usage:
/*
// Basic usage
const response1 = await getPosts();

// With pagination
const response2 = await getPosts({
  page: 2,
  limit: 20
});

// With search and filters
const response3 = await getPosts({
  search: 'technology',
  categories: ['tech', 'news'],
  status: PostStatus.PUBLISHED,
  startDate: new Date('2024-01-01'),
  sortBy: 'publishedAt',
  order: 'desc'
});

// With all options
const response4 = await getPosts({
  page: 1,
  limit: 10,
  search: 'tech',
  categories: ['technology'],
  tags: ['featured'],
  status: PostStatus.PUBLISHED,
  authorId: '123',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  featured: true,
  sortBy: 'views',
  order: 'desc',
  recent: true
});
*/
