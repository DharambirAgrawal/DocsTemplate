"use server";
import { handleServerError } from "@/lib/error-handler";
import { asyncErrorHandler } from "@/lib/error-handler";
import { AppError } from "@/types/errors";
import { fetchWithTokenRefresh } from "@/utils/fetchUtil";
export const publishPost = asyncErrorHandler( async (formData: any) => {

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
   
    if (!data.success) {
      throw new AppError(data.message || "Post not created", 400);
    }else{
      return data
    }
});


export const getPosts =  asyncErrorHandler( async ({
  recent,
}:{
  recent?: boolean
}) => {

  // const res = await fetch(`${process.env.CLIENT_BASE_URL}/api/cookies`,{
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     recent: "Hello world"
  //   })
  // })
  
    const data = await fetchWithTokenRefresh(`/api/blog/posts?recent=${recent}`, {
      method: "GET",
    });
    if (!data.success) {
      throw new AppError(data.message || "Post not found", 404);
    }else{
      return {
        success: true,
        data: data.data,
      };
    }
})