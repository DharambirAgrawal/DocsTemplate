"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigation, NAME } from "@/lib/data";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${
          scrolled
            ? "bg-white dark:bg-gray-900 shadow-md"
            : "bg-white/80 dark:bg-gray-800 backdrop-blur-sm"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent group-hover:to-blue-600 transition-all duration-300">
              Clurse
            </span>
          </Link> */}
          <Link href="/" className="flex items-center space-x-2 justify-center">
            <Image
              src="/icons/logo.png"
              height={100}
              width={100}
              className=" h-10 w-10"
              alt="Logo"
            />
            <div className="text-2xl font-semibold text-gray-900">{NAME}</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-2 py-1 font-medium transition-all duration-200
                  text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 group 
                  ${
                    pathname === item.href
                      ? "text-blue-600 dark:text-blue-400"
                      : ""
                  }
                `}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ease-out
                  ${
                    pathname === item.href ? "scale-x-100" : "scale-x-0"
                  } group-hover:scale-x-100`}
                />
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200
              rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <nav className="py-4 flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-2 py-1 font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200
                  transform hover:translate-x-2 ${
                    pathname === item.href
                      ? "text-blue-600 dark:text-blue-400 translate-x-2"
                      : ""
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <hr className="my-4 border-gray-200 dark:border-gray-600" />
            <Link
              href="/auth/signin"
              className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center
                hover:bg-blue-700 transform hover:scale-105 active:scale-95 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
