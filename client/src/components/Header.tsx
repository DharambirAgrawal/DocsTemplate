// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Menu, X, ChevronUp } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { navigation, NAME } from "@/lib/data";
// import Image from "next/image";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
//         ${
//           scrolled
//             ? "bg-white dark:bg-gray-900 shadow-md"
//             : "bg-white/80 dark:bg-gray-800 backdrop-blur-sm"
//         }
//       `}
//     >
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}

//           <Link href="/" className="flex items-center space-x-2 justify-center">
//             <Image
//               src="/icons/logo.png"
//               height={100}
//               width={100}
//               className=" h-10 w-10"
//               alt="Logo"
//             />
//             <div className="text-2xl font-semibold text-gray-900">{NAME}</div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`relative px-2 py-1 font-medium transition-all duration-200
//                   text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 group
//                   ${
//                     pathname === item.href
//                       ? "text-blue-600 dark:text-blue-400"
//                       : ""
//                   }
//                 `}
//               >
//                 {item.name}
//                 <span
//                   className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ease-out
//                   ${
//                     pathname === item.href ? "scale-x-100" : "scale-x-0"
//                   } group-hover:scale-x-100`}
//                 />
//               </Link>
//             ))}
//           </nav>

//           {/* Auth Buttons - Desktop */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link
//               href="/auth/signin"
//               className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
//             >
//               Sign In
//             </Link>
//             <Link
//               href="/auth/signup"
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
//             >
//               Sign Up
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200
//               rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
//             ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
//           `}
//         >
//           <nav className="py-4 flex flex-col space-y-4">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`px-2 py-1 font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200
//                   transform hover:translate-x-2 ${
//                     pathname === item.href
//                       ? "text-blue-600 dark:text-blue-400 translate-x-2"
//                       : ""
//                   }
//                 `}
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.name}
//               </Link>
//             ))}
//             <hr className="my-4 border-gray-200 dark:border-gray-600" />
//             <Link
//               href="/auth/signin"
//               className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Sign In
//             </Link>
//             <Link
//               href="/auth/signup"
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center
//                 hover:bg-blue-700 transform hover:scale-105 active:scale-95 transition-all duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Sign Up
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigation, NAME } from "@/lib/data";
import Image from "next/image";
import ClickOutside from "./ClickOutside";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // const mobileMenuRef = useRef(null);
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  const handleClickOutside = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group relative z-10"
          >
            <div className="relative overflow-hidden rounded-full">
              <Image
                src="/icons/logo.png"
                height={38}
                width={38}
                className={`transition-all duration-300 ${
                  scrolled ? "h-8 w-8" : "h-10 w-10"
                } group-hover:scale-110`}
                alt="Logo"
              />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <span
              className={`font-bold transition-all duration-300 ${
                scrolled ? "text-xl" : "text-2xl"
              } text-slate-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400`}
            >
              {NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 rounded-lg font-medium text-sm lg:text-base transition-all duration-200 overflow-hidden
                  ${
                    pathname === item.href
                      ? "text-white bg-blue-500 dark:bg-blue-600 shadow-md"
                      : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }
                `}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname === item.href && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 -z-0"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {/* Theme Toggle */}
            {/* <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button> */}

            {/* Search Button */}
            {/* <button
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button> */}

            {/* Auth Buttons */}
            <Link
              href="/auth/signin"
              className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Theme Toggle - Mobile */}
            {/* <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button> */}

            {/* Menu Button - Mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-10 h-10 text-slate-700 dark:text-slate-300 
                rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Using a slide down animation instead of slide-in from side */}
      <ClickOutside
        className={`md:hidden bg-white dark:bg-slate-900 shadow-xl overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}
        `}
        onClick={handleClickOutside}
      >
        <div className="px-4 py-6">
          <nav className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`py-3 px-4 text-base font-medium rounded-lg transition-all duration-200 
                  ${
                    pathname === item.href
                      ? "text-white bg-blue-500 dark:bg-blue-600"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>

            {/* Search - Mobile
            <button className="flex items-center py-3 px-4 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Search size={18} className="mr-3" />
              <span>Search</span>
            </button> */}

            {/* Auth Buttons - Mobile */}
            <div className="flex flex-col space-y-3 pt-2">
              <Link
                href="/auth/signin"
                className="py-3 px-4 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="py-3 text-center bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-medium
                  transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </ClickOutside>
    </header>
  );
};

export default Header;
