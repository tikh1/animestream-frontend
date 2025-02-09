"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, User, Bell, HelpCircle } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

// Örnek bildirimler
const notifications = [
  {
    id: 1,
    title: "Yeni Bölüm Yayında!",
    message: "Attack on Titan'ın yeni bölümü yayınlandı. Hemen izle!",
    time: "5 dakika önce",
  },
  {
    id: 2,
    title: "Arkadaş İsteği",
    message: "AnimeLovers123 seni arkadaş olarak eklemek istiyor.",
    time: "2 saat önce",
  },
  {
    id: 3,
    title: "Özel Teklif",
    message: "Premium üyelik şimdi %50 indirimli! Bu fırsatı kaçırma.",
    time: "1 gün önce",
  },
  {
    id: 5,
    title: "Özel Teklif",
    message: "Premium üyelik şimdi %50 indirimli! Bu fırsatı kaçırma.",
    time: "1 gün önce",
  },
  {
    id: 7,
    title: "Özel Teklif",
    message: "Premium üyelik şimdi %50 indirimli! Bu fırsatı kaçırma.",
    time: "1 gün önce",
  },
]

const NotificationItem = ({ notification, onDelete }) => (
  <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center border-b last:border-0">
    <div className="flex-grow pr-2">
      <h4 className="text-sm font-semibold">{notification.title}</h4>
      <p className="text-sm text-muted-foreground">{notification.message}</p>
      <span className="text-xs text-muted-foreground">{notification.time}</span>
    </div>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDelete(notification.id)}
      className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors shrink-0"
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
)

const SearchResultsDropdown = ({ results, isMobile = false }) => {
  if (!results || results.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute mt-1 w-full bg-background border border-border rounded-md shadow-lg"
    >
      <div className="max-h-[300px] overflow-hidden">
        <ScrollArea className="h-[300px]">
          <div className="py-2">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="px-3 py-2 hover:bg-accent cursor-pointer flex items-center rounded-md mx-1"
              >
                <div className="flex-shrink-0 mr-2">
                  <Image
                    src={result.image || "/placeholder.svg"}
                    alt={result.name}
                    width={isMobile ? 20 : 30}
                    height={45}
                    className={`object-cover rounded-md ${isMobile ? "w-[20px]" : "w-[30px]"} h-[45px]`}
                  />
                </div>
                <span className="text-sm">{result.name}</span>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  )
}

const animeList = [
  // Add your anime data here
  { name: "Attack on Titan", image: "/attack-on-titan.jpg" },
  { name: "Demon Slayer", image: "/demon-slayer.jpg" },
  { name: "My Hero Academia", image: "/my-hero-academia.jpg" },
  // ... more anime data
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [currentNotifications, setCurrentNotifications] = useState(notifications)
  const [currentUser, setCurrentUser] = useState({ username: "aliengin" })
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value.length > 0) {
      const filteredResults = animeList.filter((anime) => anime.name.toLowerCase().includes(value.toLowerCase()))
      setSearchResults(filteredResults)
    } else {
      setSearchResults([])
    }
  }

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 sm:py-4 px-3">
          <Link href="/" className="text-xl sm:text-2xl font-bold mr-4">
            AnimeStream
          </Link>
          <div className="flex items-center space-x-2">
            <div className="hidden md:block relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                className="pl-8 w-40 lg:w-60"
                placeholder="Anime ara..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <AnimatePresence>
                {searchTerm.length > 0 && <SearchResultsDropdown results={searchResults} />}
              </AnimatePresence>
            </div>
            <ThemeToggle />
            <Link href="/help">
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex border">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </Link>
            <div className="hidden sm:flex space-x-2 items-center">
              {isLoggedIn ? (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="border relative">
                        <Bell className="h-4 w-4" />
                        {currentNotifications.length > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5 flex flex-col items-center justify-center"
                          >
                            {currentNotifications.length}
                          </Badge>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0">
                      <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Bildirimler</h3>
                          <Button variant="ghost" size="sm" onClick={() => setCurrentNotifications([])}>
                            Hepsini Temizle
                          </Button>
                        </div>
                      </div>
                      <ScrollArea className={`${currentNotifications.length > 0 ? "h-80" : "h-auto"} px-4 py-2`}>
                        {currentNotifications.length > 0 ? (
                          <div className="space-y-4">
                            {currentNotifications.map((notification) => (
                              <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onDelete={(id) => setCurrentNotifications((prev) => prev.filter((n) => n.id !== id))}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="py-4 text-center">
                            <p className="text-muted-foreground">Hımmm hiç bildirimin yok gibi duruyor</p>
                          </div>
                        )}
                      </ScrollArea>
                    </PopoverContent>
                  </Popover>
                  <Link href={`/profile/${currentUser.username}`}>
                    <Button variant="ghost" size="sm" className="border flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profil
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="px-3 py-2 h-9 text-sm">
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="px-3 py-2 h-9 text-sm">
                      Kayıt Ol
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <Button variant="ghost" size="icon" className="sm:hidden ml-2" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-lg"
          >
            <div className="container mx-auto py-4 px-3 space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  className="pl-8 w-full"
                  placeholder="Anime ara..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <AnimatePresence>
                  {searchTerm.length > 0 && <SearchResultsDropdown results={searchResults} isMobile />}
                </AnimatePresence>
              </div>
              <div className="flex flex-col space-y-2">
                {isLoggedIn ? (
                  <Link href={`/profile/${currentUser.username}`}>
                    <Button variant="ghost" size="sm" className="border w-full flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profil
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" size="sm" className="w-full">
                        Giriş Yap
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button size="sm" className="w-full">
                        Kayıt Ol
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              <Button variant="ghost" size="sm" className="w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                Yardım
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

