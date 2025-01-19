
import { AppSidebar } from '@/app/(courses)/components/AppSidebar'
import Navigation from '@/components/Header'
// import DefaultLayout from '@/components/DefaultLayout'

export const metadata = {
  title: 'Minimal Docs Site',
  description: 'A gorgeous minimal documentation site using Next.js App Router',
}

import DefaultLayout from '../../components/DefaultLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <DefaultLayout>

    {/* <Navigation /> */}
    
    {/* <div className="flex min-h-screen"> */}
    {/* <AppSidebar /> */}

    {children}
    
    {/* </div> */}
    </DefaultLayout>
    </>
     
  )
}

