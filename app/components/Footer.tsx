import { Instagram, Twitter, Youtube, DiscIcon as Discord } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-center sm:text-left mb-4 sm:mb-0 text-sm sm:text-base">&copy; 2025 AnimeStream. All rights reserved.</p>
          <div className="flex space-x-2 sm:space-x-4">
            <Link href="https://discord.gg/animestream" target="_blank" rel="noopener noreferrer">
              <Discord className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" />
            </Link>
            <Link href="https://instagram.com/animestream" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" />
            </Link>
            <Link href="https://twitter.com/animestream" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" />
            </Link>
            <Link href="https://youtube.com/animestream" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

