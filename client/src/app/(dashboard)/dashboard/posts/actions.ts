"use server";
import { handleServerError } from "@/lib/error-handler";
import { AppError } from "@/types/errors";
import { setCookie, removeCookie, getCookie } from "@/lib/cookies";
import { fetchWithTokenRefresh } from "@/utils/fetchUtil";
export const publishPost = async (formData: any) => {
  console.log(formData);
  try {

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


    let data
    if(status === "draft"){
       data = await fetchWithTokenRefresh("/api/blog/publish?publish=false", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(formData),
      });
    }else{

    //TODO: validate fiels before sending to server
       data = await fetchWithTokenRefresh("/api/blog/publish?publish=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(formData),
      });
    }
   
    console.log(data);
    if(data.status != 'success'){
      throw new AppError("Post not created", 400);
    }
    return {
      success: true,
      data: data.data,
    };

  } catch (error) {
    return handleServerError(error);
  }
};


export const getPosts = async () => {
  try {
    const data = await fetchWithTokenRefresh(`/api/blog/posts?category=design`, {
      method: "GET",
    });
    console.log(data);
    console.log(data.data[0].categories)
    if(data.status != 'success'){
      throw new AppError("Post not found", 404);
    }
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    return handleServerError(error);
  }
}