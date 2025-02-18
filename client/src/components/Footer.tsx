// components/Footer.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { footerLinks, NAME } from "@/lib/data";
const Footer = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block group">
              <span className="text-xl font-bold text-gray-900">{NAME}</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Empowering learners through interactive courses and insightful
              content.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div
              key={category}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="space-y-4"
            >
              <h3 className="font-semibold text-gray-900">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li
                    key={link.name}
                    className="transform transition-all duration-200"
                    style={{
                      transitionDelay:
                        hoveredCategory === category
                          ? `${index * 50}ms`
                          : "0ms",
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`text-gray-600 hover:text-blue-600 text-sm inline-block
                          transform transition-all duration-200 hover:translate-x-1
                          ${hoveredCategory === category ? "translate-x-1" : ""}
                        `}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Clurse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
