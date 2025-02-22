"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { tv } from "tailwind-variants"

export default function SecondaryNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const roles = JSON.parse(localStorage.getItem("roles") || "[]")

    setIsLoggedIn(!!token)
    
    setIsAdmin(roles.includes("admin"))

  }, [localStorage.getItem("token")])

  const navItems = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Anime Listesi", href: "/anime-list" },
    { label: "Trending", href: "/trending" },
    { label: "İzleme Geçmişi", href: "/watch-history" },
    { label: "Blog", href: "/blog" },
    { label: "Hakkımızda", href: "/about" },
  ]

  const linkStyles = tv({
    base: [
      "inline-flex items-center px-3 py-2 text-sm font-medium",
      "bg-primary text-primary-foreground hover:bg-primary/90",
      "rounded-md transition-colors duration-200",
    ],
  })

  return (
    <div className="border-b bg-background">
      <nav className="container mx-auto px-4">
        <div className="hidden md:flex items-center">
          {/* Desktop view */}
          <ul className="hidden md:flex items-center h-12">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors",
                    pathname === item.href && "bg-secondary text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center gap-2 ml-auto">
            {isAdmin && (
              <Link href="/admin" className={linkStyles()}>
                Admin Panel
              </Link>
            )}
            <Link href="/plans" className={linkStyles()}>
              Planlar
            </Link>
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden py-1">
          <div className="flex justify-center w-full">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center w-full mx-4"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Menu
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full rounded-xl overflow-hidden">
                {isOpen && (
                  <div className="md:hidden py-0.5 space-y-0.5">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center px-3 py-2.5 text-sm font-medium transition-colors rounded-lg",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className={cn(
                          "flex items-center justify-center px-3 py-2.5 text-sm font-medium transition-colors rounded-lg",
                          pathname === "/admin"
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      href="/plans"
                      className={cn(
                        "flex items-center justify-center px-3 py-2.5 text-sm font-medium transition-colors rounded-lg",
                        pathname === "/plans"
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-accent",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Planlar
                    </Link>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </div>
  )
}
