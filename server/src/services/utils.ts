
// Function to separate base URL from Cloudinary image URL
export function separateCloudinaryBaseUrl(imageUrl: string): string {
    const regex = /^(https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/)(.*)$/;
    const match = imageUrl.match(regex);
    if (match) {
      const mainUrl = match[2]; // The remaining part, including public ID
      return mainUrl;
    } else {
      throw new Error("Invalid Cloudinary image URL");
    }
  }