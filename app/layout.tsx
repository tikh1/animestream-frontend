import { ThemeProvider } from './components/ThemeProvider'
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false });
const SecondaryNav = dynamic(() => import("./components/SecondaryNav"), { ssr: false });
import Footer from './components/Footer'
import { Metadata } from 'next'
import './globals.css'
import ClientWrapper from './components/ClientWrapper'

export const metadata: Metadata = {
  title: 'AnimeStream - Your Ultimate Anime Destination',
  description: 'Discover, watch, and discuss the best anime series and movies. Join our community of anime lovers!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientWrapper>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <SecondaryNav />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

