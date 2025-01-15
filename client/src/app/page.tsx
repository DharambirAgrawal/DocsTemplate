import type { Metadata } from 'next'
import { PageNavigation } from '@/app/(courses)/components/PageNavigation'
import DropdownDefaultTwo from '@/components/ui/Dropdowns/DropdownDefaultTwo'
import DefaultSelectOption from '@/components/SelectOption/DefaultSelectOption'
import Navigation from '@/components/Header'
export const metadata: Metadata = {
  title: 'Introduction | Minimal Docs Site',
  description: 'Welcome to our minimal documentation site',
}

export default function Home() {
  return (
    <>
    <Navigation />
    <main className="mx-auto max-w-3xl">
    <h1 className="mb-6 text-4xl font-bold">Welcome to Our Docs</h1>
    <p className="mb-4 text-gray-600 dark:text-gray-300">
    This is a gorgeous minimal documentation site built with Next.js and
    Tailwind CSS.
    </p>
    <DropdownDefaultTwo />
    <DefaultSelectOption options={['Option 1', 'Option 2', 'Option 3']} />
    <h2 className="mb-4 mt-8 text-2xl font-semibold">Features</h2>
    <ul className="mb-4 list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
    <li>Clean and minimal design</li>
    <li>Dark mode support</li>
    <li>Responsive layout</li>
    <li>Easy navigation with custom sidebar</li>
    <li>Built with Next.js App Router</li>
    </ul>
    <h2 className="mb-4 mt-8 text-2xl font-semibold">Getting Started</h2>
    <p className="mb-4">
    To get started with our documentation, please navigate through the
    sections using the sidebar on the left. Here&apos;s a quick overview of
    the available sections:
    </p>
    <ul className="mb-4 list-inside list-disc space-y-1">
    <li>
    <strong>Getting Started</strong>: Learn how to install and set up our
    library
    </li>
    <li>
    <strong>Components</strong>: Explore the available components and how
    to use them
    </li>
    <li>
    <strong>API Reference</strong>: Detailed information about our API and
    its methods
    </li>
    </ul>
    <p className="mb-4">
    If you have any questions or need further assistance, don&apos;t
    hesitate to reach out to our support team.
    </p>
    <h2 className="mb-4 mt-8 text-2xl font-semibold">Contributing</h2>
    <p className="mb-4">
    We welcome contributions to our documentation. If you find any errors or
    have suggestions for improvement, please open an issue or submit a pull
    request on our GitHub repository.
    </p>
    <p className="mb-4">
    We welcome contributions to our documentation. If you find any errors or
    have suggestions for improvement, please open an issue or submit a pull
    request on our GitHub repository.
    </p><p className="mb-4">
    We welcome contributions to our documentation. If you find any errors or
    have suggestions for improvement, please open an issue or submit a pull
    request on our GitHub repository.
    </p><p className="mb-4">
    We welcome contributions to our documentation. If you find any errors or
    have suggestions for improvement, please open an issue or submit a pull
    request on our GitHub repository.
    </p><p className="mb-4">
    We welcome contributions to our documentation. If you find any errors or
    have suggestions for improvement, please open an issue or submit a pull
    request on our GitHub repository.
    </p><p className="mb-4">
    We welcome contributions to our documentation. If you find any errors or
    have suggestions for improvement, please open an issue or submit a pull
    request on our GitHub repository.
    </p><p className="mb-4">
    We welcome contributions to our documentation. If you find any errors or
    have suggestions for improvement, please open an issue or submit a pull
    request on our GitHub repository.
    </p>
    
    <PageNavigation />
    </main>
    </>
  )
}

