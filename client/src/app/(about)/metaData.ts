import { baseMetadata } from "@/lib/metaData";
import type { Metadata } from "next";

export const aboutLayoutMetadata: Metadata = {
  ...baseMetadata,
  title: {
    default: "About Pathgurus",
    template: "%s | About Pathgurus",
  },
  description:
    "Learn more about Pathgurus, our mission, and the team behind the platform.",
};

// About us page metadata
export const aboutUsMetadata: Metadata = {
  ...baseMetadata,
  title: "About Us | Pathgurus",
  description:
    "Meet the team behind Pathgurus and discover our journey in transforming online education.",
  openGraph: {
    title: "About Us | Pathgurus",
    description:
      "Meet the team behind Pathgurus and discover our journey in transforming online education.",
    type: "website",
    url: `${process.env.APP_URL}/about/us`,
  },
};

// Terms and conditions metadata
export const termsAndConditionsMetadata: Metadata = {
  ...baseMetadata,
  title: "Terms and Conditions | Pathgurus",
  description:
    "Read our terms and conditions to understand your rights and responsibilities when using Pathgurus.",
  openGraph: {
    title: "Terms and Conditions | Pathgurus",
    description:
      "Read our terms and conditions to understand your rights and responsibilities when using Pathgurus.",
    type: "website",
    url: `${process.env.APP_URL}/about/terms`,
  },
};

// Privacy policy metadata
export const privacyPolicyMetadata: Metadata = {
  ...baseMetadata,
  title: "Privacy Policy | Pathgurus",
  description:
    "Learn how we collect, use, and protect your personal information at Pathgurus.",
  openGraph: {
    title: "Privacy Policy | Pathgurus",
    description:
      "Learn how we collect, use, and protect your personal information at Pathgurus.",
    type: "website",
    url: `${process.env.APP_URL}/about/privacy`,
  },
};
