'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const allPages = [
  { title: 'Introduction', url: '/' },
  { title: 'Getting Started', url: '/getting-started' },
  { title: 'Components', url: '/components' },
  { title: 'API Reference', url: '/api-reference' },
]

export function PageNavigation() {
  const pathname = usePathname()
  const currentPageIndex = allPages.findIndex(page => page.url === pathname)
  const prevPage = currentPageIndex > 0 ? allPages[currentPageIndex - 1] : null
  const nextPage = currentPageIndex < allPages.length - 1 ? allPages[currentPageIndex + 1] : null

  return (
    <div className="flex justify-between mt-12 pt-6 border-t">
      {prevPage ? (
        <Link href={prevPage.url} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>{prevPage.title}</span>
        </Link>
      ) : (
        <div></div>
      )}
      {nextPage && (
        <Link href={nextPage.url} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <span>{nextPage.title}</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      )}
    </div>
  )
}

