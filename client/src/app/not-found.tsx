'use client'
import Link from 'next/link'
import { usePathname,  } from 'next/navigation'
export default function NotFound() {


  // Check if the path starts with '/dashboard'
  
  const pathname = usePathname()
  const isDashboardRoute = pathname.startsWith('/dashboard')


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="text-center max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-6">Oops! The requested resource could not be found.</p>

        {isDashboardRoute ? (
          <Link href="/dashboard/home" className="inline-block bg-blue-500 text-white py-2 px-6 rounded-md text-lg font-medium transition duration-300 hover:bg-blue-600">
            
              Return to Dashboard Home
            
          </Link>
        ) : (
          <Link href="/" className="inline-block bg-indigo-500 text-white py-2 px-6 rounded-md text-lg font-medium transition duration-300 hover:bg-indigo-600">
           
              Return Home
          
          </Link>
        )}
      </div>
    </div>
  );
}
