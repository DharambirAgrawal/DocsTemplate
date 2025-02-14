"use server";
import { handleServerError } from "@/lib/error-handler";
import { asyncErrorHandler } from "@/lib/error-handler";
import { AppError } from "@/types/errors";
import { fetchWithTokenRefresh } from "@/utils/fetchUtil";
export const publishPost = asyncErrorHandler(async (formData: any) => {
  const title = formData.title;
  const timeRead = formData.timeRead;
  const content = formData.content;
  const summary = formData.summary;
  const imageUrl = formData.imageUrl;
  const metaTitle = formData.metaTitle;
  const metaDesc = formData.metaDesc;
  const metaKeywords = formData.metaKeywords;
  const metaImage = formData.metaImage;
  const categories = formData.categories;
  const tags = formData.tags;
  const status = formData.status;

  let data;
  if (status === "draft") {
    data = await fetchWithTokenRefresh("/api/blog/publish?publish=false", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } else {
    //TODO: validate fiels before sending to server
    data = await fetchWithTokenRefresh("/api/blog/publish?publish=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

  if (!data.success) {
    throw new AppError(data.message || "Post not created", 400);
  } else {
    return data;
  }
});

export const getPosts = asyncErrorHandler(
  async ({ recent, take }: { recent?: boolean; take?: number }) => {
    const params = new URLSearchParams();

    if (recent !== undefined) {
      params.append("recent", String(recent));
    }

    if (take !== undefined) {
      params.append("take", String(take));
    }

    const queryString = params.toString();
    const url = `/api/blog/posts${queryString ? "?" + queryString : ""}`;

    const data = await fetchWithTokenRefresh(url, {
      method: "GET",
    });

    if (!data.success) {
      throw new AppError(data.message || "Post not found", 404);
    } else {
      return {
        success: true,
        data: data.data,
      };
    }
  }
);

// export const getCategories = asyncErrorHandler(
//   async ({ recent, limit }: { recent: boolean; limit: number }) => {
//     const params = new URLSearchParams();

//     if (recent !== undefined) {
//       params.append("recent", String(recent));
//     }

//     if (limit !== undefined) {
//       params.append("limit", String(limit));
//     }

//     const queryString = params.toString();
//     const url = `/api/blog/categories${queryString ? "?" + queryString : ""}`;

//     const data = await fetchWithTokenRefresh(url, {
//       method: "GET",
//     });

//     if (!data.success) {
//       throw new AppError(data.message || "Post not found", 404);
//     } else {
//       return {
//         success: true,
//         data: data.data,
//       };
//     }
//   }
// );

export const getCategories = async (filters: {
  limit?: number;
  category?: string;
  recent?: boolean;
}) => {
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
    const { limit = 6, category, recent } = filters;

    // Add pagination params

    addParam("limit", limit);
    addParam("category", category);
    addParam("recent", recent);

    // Build the URL with query parameters
    const url = `${
      process.env.SERVER_BASE_URL
    }/api/blog/public/categories?${queryParams.toString()}`;

    // Make the request with error handling
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
