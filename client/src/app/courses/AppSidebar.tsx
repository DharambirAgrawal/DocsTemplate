'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GalleryVerticalEnd, Search, Menu, X } from 'lucide-react'

const navItems = [
  {
    title: 'Getting Started',
    children: [
      { title: 'Introduction of the length of HTML', url: '/' },
      { title: 'Installation', url: '/getting-started' },
    ],
  },
  {
    title: 'Core Concepts',
    children: [
      { title: 'Components', url: '/components' },
      { title: 'API Reference', url: '/api-reference' },
    ],
  },
  {
    title: 'Core Concepts',
    children: [
      { title: 'Components', url: '/components' },
      { title: 'API Reference', url: '/api-reference' },
    ],
  },{
    title: 'Core Concepts',
    children: [
      { title: 'Components', url: '/components' },
      { title: 'API Reference', url: '/api-reference' },
    ],
  },{
    title: 'Core Concepts',
    children: [
      { title: 'Components', url: '/components' },
      { title: 'API Reference', url: '/api-reference' },
    ],
  },{
    title: 'Core Concepts',
    children: [
      { title: 'Components', url: '/components' },
      { title: 'API Reference', url: '/api-reference' },
    ],
  },{
    title: 'Core Concepts',
    children: [
      { title: 'Components', url: '/components' },
      { title: 'API Reference', url: '/api-reference' },
    ],
  },{
    title: 'Core Concepts',
    children: [
      { title: 'Components', url: '/components' },
      { title: 'API Reference', url: '/api-reference' },
    ],
  },{
    title: 'Core Concepts',
    children: [
      { title: 'Components', url: '/components' },
      { title: 'API Reference', url: '/api-reference' },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [searchResults, setSearchResults] = React.useState<Array<{ title: string; url: string }>>([])

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.length > 1) {
      const results = navItems.flatMap(item => 
        item.children.filter(child => 
          child.title.toLowerCase().includes(term.toLowerCase())
        )
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r dark:bg-gray-800 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b dark:border-gray-700">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white flex aspect-square w-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Docs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">v1.0.0</span>
              </div>
            </Link>
          </div>
          <div className="p-4 border-b dark:border-gray-700">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search the docs..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>
            {searchResults.length > 0 && (
              <ul className="mt-2 space-y-1">
                {searchResults.map((result, index) => (
                  <li key={index}>
                    <Link
                      href={result.url}
                      className="block px-2 py-1 text-sm text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-700 rounded"
                      onClick={() => {
                        setSearchTerm('')
                        setSearchResults([])
                        setIsOpen(false)
                      }}
                    >
                      {result.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Navigation</h2>
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <div className="mb-2 font-medium text-gray-900 dark:text-gray-100">{item.title}</div>
                  <ul className="space-y-1 pl-4">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <Link
                          href={child.url}
                          className={`block px-2 py-1 rounded-md text-sm ${
                            pathname === child.url
                              ? 'bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

