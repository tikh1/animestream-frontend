"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  PlayCircle,
  ChevronDown,
  MessageSquare,
  CreditCard,
  List,
  Upload,
  PlusCircle,
} from "lucide-react"

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Kullanıcılar", href: "/admin/users", icon: Users },
  { label: "Animeler", href: "/admin/animes", icon: PlayCircle },
  { label: "Yorumlar", href: "/admin/comments", icon: MessageSquare },
  { label: "Satılan Üyelikler", href: "/admin/memberships", icon: CreditCard },
  { label: "Anime Oluştur", href: "/admin/create-anime", icon: PlusCircle },
  { label: "Anime Yükle", href: "/admin/upload", icon: Upload },
  { label: "Yüklenen Animeler", href: "/admin/uploaded-animes", icon: List },
  { label: "Blog Oluştur", href: "/admin/create-blog", icon: List },
]

// Assuming isAdmin function is defined elsewhere
const isAdmin = () => {
  // Replace with your actual isAdmin logic
  return true // For testing purposes
}

export default function AdminNav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div className="hidden md:flex items-center space-x-4">
            {adminNavItems.map((item) => {
              const Icon = item.icon
              // Only render the "Satılan Üyelikler" button if isAdmin() is true
              if (item.label === "Satılan Üyelikler" && !isAdmin()) {
                return null
              }
              if (item.label === "Blog Oluştur" && !isAdmin()) {
                 return null
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              Admin Menü
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden py-2 space-y-2">
            {adminNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}

