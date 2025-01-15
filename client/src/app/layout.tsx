import '../../styles/globals.css'
import { Inter } from 'next/font/google'
import { AppSidebar } from '@/app/(courses)/components/AppSidebar'

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
            {children}
          
       </body> 
    </html>
  )
}

