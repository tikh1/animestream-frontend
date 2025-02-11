"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, User, Bell, HelpCircle, LogOut } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { logout } from "@/services/auth";

const notifications = [
  { id: 1, title: "Yeni Bölüm Yayında!", message: "Attack on Titan'ın yeni bölümü yayınlandı.", time: "5 dakika önce" },
  { id: 2, title: "Arkadaş İsteği", message: "AnimeLovers123 seni arkadaş olarak eklemek istiyor.", time: "2 saat önce" },
  { id: 3, title: "Özel Teklif", message: "Premium üyelik %50 indirimli!", time: "1 gün önce" },
]

const animeList = [
  { name: "Attack on Titan", image: "/attack-on-titan.jpg" },
  { name: "Demon Slayer", image: "/demon-slayer.jpg" },
  { name: "My Hero Academia", image: "/my-hero-academia.jpg" },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentNotifications, setCurrentNotifications] = useState(notifications)
  const [currentUser, setCurrentUser] = useState({ username: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true)
      setCurrentUser({ username: localStorage.getItem("user") || "" })
    }
  }, [])

  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false)
    router.push('/login');
  }

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur relative z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-2 sm:py-4">
        <Link href="/" className="text-xl sm:text-2xl font-bold">
          AnimeStream
        </Link>
        <div className="flex items-center space-x-2">
          <div className="hidden md:block relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              className="pl-8 w-40 lg:w-60"
              placeholder="Anime ara..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setSearchResults(
                  e.target.value.length > 0
                    ? animeList.filter((anime) => anime.name.toLowerCase().includes(e.target.value.toLowerCase()))
                    : []
                )
              }}
            />
            <AnimatePresence>
              {searchTerm.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute mt-1 w-full bg-background border border-border rounded-md shadow-lg"
                >
                  <ScrollArea className="h-[300px]">
                    <div className="py-2">
                      {searchResults.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="px-3 py-2 hover:bg-accent cursor-pointer flex items-center rounded-md mx-1"
                        >
                          <Image src={result.image || "/placeholder.svg"} alt={result.name} width={30} height={45} className="object-cover rounded-md w-[30px] h-[45px]" />
                          <span className="text-sm">{result.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />
          <Link href="/help">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex border">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="border relative">
                    <Bell className="h-4 w-4" />
                    {currentNotifications.length > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5 flex items-center justify-center"
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
                          <div key={notification.id} className="py-3 flex justify-between items-center border-b last:border-0">
                            <div className="flex-grow pr-2">
                              <h4 className="text-sm font-semibold">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setCurrentNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
                              className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-4 text-center">
                        <p className="text-muted-foreground">Hiç bildirimin yok</p>
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

              <Button onClick={handleLogout} variant="destructive" size="sm" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Çıkış Yap
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login"><Button variant="outline" size="sm">Giriş Yap</Button></Link>
              <Link href="/register"><Button size="sm">Kayıt Ol</Button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
