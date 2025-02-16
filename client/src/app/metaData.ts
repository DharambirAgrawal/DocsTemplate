import { Metadata } from "next";
import { baseMetadata, keywords } from "@/lib/metaData";

export const landingPageMetadata: Metadata = {
  ...baseMetadata,
  title: {
    default: "Pathgurus - Learn Online",
    template: "%s | Pathgurus",
  },
  description:
    "Pathgurus is a comprehensive platform for learning and teaching online. Join our community of educators and learners to expand your knowledge and skills.",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "en-GB": "/en-GB",
    },
  },
  keywords: keywords.length == 0 ? [] : keywords,
  twitter: {
    card: "summary_large_image",
    title: "Pathgurus - Learn and Teach Online",
    description: "Transform your learning journey with Pathgurus",
    images: ["/images/ogimages/og-800x600.png"],
    creator: "@pathgurus",
    site: "@pathgurus",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      me: ["your-social-profile-url"],
    },
  },
};
