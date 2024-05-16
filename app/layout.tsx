import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navigator';
import Header from './components/Header'
import Footer from './components/Footer';
import { Readex_Pro } from "next/font/google";


const readexPro = Readex_Pro({
  subsets: ['latin'],
  weight: ['400', '700']
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cloud Pastry'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <link rel="icon" href="/Paccino Logo.png" sizes="any" />
      <body> 
          <Header />
        <main className = {readexPro.className}>{children}</main>
          
      </body>
    </html> 
  )
}
