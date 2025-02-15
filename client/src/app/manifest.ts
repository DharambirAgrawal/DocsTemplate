import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const categories = await fetch(
    `${process.env.SERVER_BASE_URL}/api/blog/public/categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch post: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching the post:", error);
      return {
        status: "error",
        content: "There was an error fetching the post.",
      };
    });

  return {
    // Basic Information
    name: "Pathgurus - Online",
    short_name: "Pathgurus",
    description:
      "Discover expert-led courses, interactive learning experiences, and a supportive educational community at Pathgurus.",

    // Start and Scope Configuration
    start_url: "/",
    scope: "/",
    id: "/",

    // Display and Theme Settings
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
    orientation: "any",
    background_color: "#ffffff",
    theme_color: "#004aad", // Assuming a blue theme, adjust to match your brand color

    // Icons Configuration
    icons: [
      {
        src: "/images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/favicon-16x16.png",
        sizes: "16x16",
        purpose: "any",
      },
      {
        src: "/icons/favicon-32x32.png",
        sizes: "32x32",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/favicon.ico",
        sizes: "64x64",
        type: "any",
      },
    ],

    // Screenshots for Store Listings
    // screenshots: [
    //   {
    //     src: '/screenshots/home-light.png',
    //     sizes: '1280x720',
    //     type: 'image/png',
    //     form_factor: 'wide',
    //     label: 'Homepage of Pathgurus in light mode',
    //   },
    //   {
    //     src: '/screenshots/home-dark.png',
    //     sizes: '1280x720',
    //     type: 'image/png',
    //     form_factor: 'wide',
    //     label: 'Homepage of Pathgurus in dark mode',
    //   },
    //   {
    //     src: '/screenshots/mobile-light.png',
    //     sizes: '720x1280',
    //     type: 'image/png',
    //     form_factor: 'narrow',
    //     label: 'Mobile view of Pathgurus in light mode',
    //   },
    // ],

    // Additional Properties
    categories: categories.data.map((category: any) => category.name),
    dir: "ltr",
    lang: "en",
    prefer_related_applications: false,

    // Protocol Handlers
    // protocol_handlers: [
    //   {
    //     protocol: 'web+pathgurus',
    //     url: '/course?id=%s',
    //   },
    // ],

    // Shortcuts for Quick Actions
    // shortcuts: [
    //   {
    //     name: 'My Courses',
    //     short_name: 'Courses',
    //     description: 'View your enrolled courses',
    //     url: '/dashboard/courses',
    //     icons: [{ src: '/icons/courses-icon.png', sizes: '96x96' }],
    //   },
    //   {
    //     name: 'Start Teaching',
    //     short_name: 'Teach',
    //     description: 'Create a new course',
    //     url: '/dashboard/teaching/create',
    //     icons: [{ src: '/icons/teach-icon.png', sizes: '96x96' }],
    //   },
    // ],

    // Related Applications for
    // related_applications: [
    //   {
    //     platform: 'play',
    //     url: 'https://play.google.com/store/apps/details?id=com.pathgurus.app',
    //     id: 'com.pathgurus.app',
    //   },
    //   {
    //     platform: 'itunes',
    //     url: 'https://apps.apple.com/app/pathgurus/id123456789',
    //   },
    // ],
  };
}
