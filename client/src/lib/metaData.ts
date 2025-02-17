import type { Metadata } from "next";
import type { Viewport } from "next";
export const landingPageViewPorts: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // Ensure the content fits well on different screen sizes
  themeColor: "#004aad", // Match the theme color of your website
};
export const OGimages = [
  {
    url: `${process.env.CLIENT_BASE_URL}/ogimages/og-800x600.png`, // Must be an absolute URL
    width: 800,
    height: 600,
    alt: "Pathgurus | Inspiring Ideas Everyday",
  },
  {
    url: `${process.env.CLIENT_BASE_URL}/ogimages/og-1800x1600.png`, // Must be an absolute URL
    width: 1800,
    height: 1600,
    alt: "Pathgurus | Inspiring Ideas Everyday",
  },
  {
    url: `${process.env.CLIENT_BASE_URL}/ogimages/og-1800x1600.png`, // Must be an absolute URL
    width: 1800,
    height: 1600,
    alt: "Pathgurus | Inspiring Ideas Everyday",
  },
];
export interface MetaSlugProp {
  status: "error" | "success";
  data: {
    title: string;
    imageUrl: string;
    publishedAt: string;
    metaDesc: string;
    metaKeywords: string;
    metaTitle: string;
    summary: string;
    user: {
      name: string;
      image: string;
      summary: string;
    };
    categories: {
      name: string;
      slug: string;
    }[];
    tags: {
      name: string;
      slug: string;
    }[];
  };
}

export const keywords = await fetch(
  `${process.env.SERVER_BASE_URL}/api/blog/public/tags`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
)
  .then(async (res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status}`);
    }
    const data = await res.json();
    const keywords = data.data.map((item: { name: string }) => {
      return item.name;
    });
    return keywords;
  })
  .catch((error) => {
    console.error("Error fetching the post:", error);
    return {
      status: "error",
      data: [],
    };
  });

export const baseMetadata: Partial<Metadata> = {
  metadataBase: new URL(process.env.CLIENT_BASE_URL + ""), // Updated to match your domain
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  authors: [
    { name: "Seb" },
    { name: "Dharambir Agrawal", url: process.env.CLIENT_BASE_URL + "" },
  ],
  creator: "Dharambir Agrawal",
  publisher: "Dharambir Agrawal",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Pathgurus - Learn Online",
    description: "Pathgurus is a comprehensive platform for learning online.",
    url: process.env.CLIENT_BASE_URL,
    siteName: "Pathgurus",
    images: OGimages,
    videos: [
      {
        url: `${process.env.CLIENT_BASE_URL}/ogimages/1920x1080.png`, // Must be an absolute URL
        width: 1920,
        height: 1080,
      },
    ],

    locale: "en_US",
    type: "website",
  },
};
