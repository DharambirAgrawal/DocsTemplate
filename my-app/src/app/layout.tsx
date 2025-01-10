import '../../styles/globals.css'
import { Inter } from 'next/font/google'
import { AppSidebar } from '@/app/courses/app-sidebar'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
<body className={`${inter.className} antialiased`}>
        {/* <div className="flex min-h-screen"> */}
          {/* <AppSidebar /> */}
          {/* <main className="flex-1 p-8 md:ml-64 transition-all duration-300 ease-in-out"> */} 
            {children}
          {/* </main> */}
        {/* </div> */}
       </body> 
    </html>
  )
}

