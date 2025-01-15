
import { AppSidebar } from '@/app/(courses)/components/AppSidebar'
import Navigation from '@/components/Header'

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
    <>
    <Navigation />
    
    <div className="flex min-h-screen">
    <AppSidebar />

    {children}
    
    </div>
    </>
     
  )
}

