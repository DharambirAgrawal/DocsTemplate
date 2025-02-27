import { ImageResponse } from "next/og";
import { getSpecificBlogAction } from "../../components/actions";

export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getSpecificBlogAction(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${post.data.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          padding: "20px", // Ensure some space around the text
          position: "relative",
        }}
      >
        {/* Overlay to improve text visibility */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)", // Darken the background slightly
          }}
        />

        {/* Title text with enhanced styling */}
        <div
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Shadow for better readability
            maxWidth: "90%", // Prevent text from being too wide
            marginBottom: "20px", // Add space from the image edges
          }}
        >
          {post.data.metaData.metaTitle || post.data.title}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
