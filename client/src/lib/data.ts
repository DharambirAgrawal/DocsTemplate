import {
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  XIcon,
  email,
} from "@/utils/icons";

export const NAME = "Pathgurus";
export const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Courses",
    href: "/courses",
  },
];

export const contact = {
  social: [
    {
      name: "Facebook",
      link: "https://www.facebook.com",
      icon: FacebookIcon,
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com",
      icon: InstagramIcon,
    },
    {
      name: "X",
      link: "https://www.twitter.com",
      icon: XIcon,
    },
  ],
  email: {
    value: "blog@pathgurus.com",
    icon: email,
  },
  phone: {
    value: "",
    icon: PhoneIcon,
  },
  about:
    " Pathgurus is a platform for students to learn and grow. We provide a wide range of courses and tutorials to help students learn and grow. Our mission is to make learning easy and accessible to everyone. Our team of experts is dedicated to providing high-quality content and support to help students succeed. We are committed to helping students reach their full potential and achieve their dreams. Join us today and start your learning journey with Pathgurus.",
};
