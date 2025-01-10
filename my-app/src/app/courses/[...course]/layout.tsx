
import { AppSidebar } from '@/app/courses/AppSidebar'


export const metadata = {
  title: 'Minimal Docs Site',
  description: 'A gorgeous minimal documentation site using Next.js App Router',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 p-8 md:ml-64 transition-all duration-300 ease-in-out">
            {children}
          </main>
        </div>
     
  )
}

