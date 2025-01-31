'use server'
import { getCookie, setCookie } from "@/lib/cookies";

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export const fetchWithTokenRefresh = async (
  url: string,
  options: FetchOptions = {},
  baseUrl?: string
): Promise<any> => {


  const base_url = baseUrl || process.env.SERVER_BASE_URL;
  try {
    // Get the current access token (could come from cookies/localStorage)
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    if(!refreshToken){
        throw new Error("Invalid refresh token")
    }
    if (!accessToken) {
      const res = await fetch(
        `${process.env.SERVER_BASE_URL}/api/auth/get-access-token`,{
            method: "GET",
            headers: {
                Cookie: `refreshToken=${refreshToken.value}`,
            },
        }
      );
      if(!res.ok){
        throw new Error("Error refreshing access token");
      }
      const cookie_string = res.headers.get("set-cookie");
      
      if (!cookie_string) {
        throw new Error("No Set-Cookie header in response");
      }
      const accessToken = cookie_string.match(/access_token=([^;]+)/);
        if (!accessToken) {
            throw new Error("No access token found in Set-Cookie header");
        }
      await setCookie("accessToken", accessToken[1], {
        expires: 24 * 3600 * 1000,
        maxAge: 24 * 3600,
      }); // 1 day

      return await fetchWithTokenRefresh(url, options, baseUrl);
    }

    const headers: HeadersInit = {
      ...options.headers,
      Cookie: `accessToken=${accessToken.value}`,
    };

    // Make the initial request
    let response = await fetch(base_url + url, { ...options, headers });

    // If the response is 401 (Unauthorized), try refreshing the token
    if (response.status === 401) {
        const res = await fetch(
            `${process.env.SERVER_BASE_URL}/api/auth/get-access-token`,{
                method: "GET",
                headers: {
                    Cookie: `refreshToken=${refreshToken.value}`,
                },
            }
          );
          if(!res.ok){
            throw new Error("Error refreshing access token");
          }
          const cookie_string = res.headers.get("set-cookie");
          
          if (!cookie_string) {
            throw new Error("No Set-Cookie header in response");
          }
          const accessToken = cookie_string.match(/access_token=([^;]+)/);
            if (!accessToken) {
                throw new Error("No access token found in Set-Cookie header");
            }
          await setCookie("accessToken", accessToken[1], {
            expires: 24 * 3600 * 1000,
            maxAge: 24 * 3600,
          }); // 1 day
      return await fetchWithTokenRefresh(url, options, baseUrl);

    }

    // If the response is OK, return the response data
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    console.error("Error fetching protected resource", err);
    throw err;
  }
};

//   // Example usage for fetching protected resources
//   const getProtectedData = async () => {
//     try {
//       const data = await fetchWithTokenRefresh('/api/protected-resource');
//       console.log('Fetched protected data:', data);
//     } catch (error) {
//       console.error('Error while fetching protected data:', error);
//     }
//   };
