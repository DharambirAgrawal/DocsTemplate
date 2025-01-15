'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigation } from '@/lib/data';
import { NAME } from '@/lib/data';
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 justify-center">
            <Image
              src="/images/logo.png"
              height={100}
              width={100}
              className=" h-10 w-10"
              alt="Logo"
            />
            <div className="text-2xl font-semibold text-gray-900">{NAME}</div>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 font-medium transition"
              >
                {item.name}
              </Link>
            ))}

            {/* Login Button */}
            <Link
              href="/auth/signin"
              className="ml-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Signin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-4 pt-4 pb-4 space-y-3">
          {navigation.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block text-gray-700 hover:text-gray-900 font-medium px-3 py-2 rounded-md hover:bg-gray-50"
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/auth/signin"
            className="block text-center text-white bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded-lg transition"
          >
            Signin
          </Link>
        </div>
      </div>
    </nav>
    <br  className='w-10 h-15 '/>
    </>
  );
};

export default Navigation;