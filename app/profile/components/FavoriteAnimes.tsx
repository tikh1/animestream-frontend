import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Play } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { GenreBadges } from "@/components/GenreBadges"

const favoriteAnimes = [
  { id: 1, title: "Attack on Titan", genre: ["Action", "Dark Fantasy", "Post-apocalyptic", "Thriller"], image: "/placeholder.svg?height=200&width=150&text=AoT", rating: 9.0 },
  { id: 2, title: "My Hero Academia", genre: ["Superhero", "Action", "Comedy", "School", "Shounen"], image: "/placeholder.svg?height=200&width=150&text=MHA", rating: 8.5 },
  { id: 3, title: "Death Note", genre: ["Mystery", "Psychological Thriller", "Supernatural", "Crime", "Drama"], image: "/placeholder.svg?height=200&width=150&text=Death+Note", rating: 9.0 },
  { id: 4, title: "One Punch Man", genre: ["Action", "Comedy", "Superhero", "Parody", "Sci-Fi"], image: "/placeholder.svg?height=200&width=150&text=OPM", rating: 8.8 },
]

export function FavoriteAnimes() {
  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-6">Favori Animeler</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteAnimes.map((anime, index) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:shadow-primary/10">
                <CardContent className="p-0">
                  <div className="relative">
                    <img src={anime.image || "/placeholder.svg"} alt={anime.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{anime.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="p-4 h-[120px] flex flex-col justify-between">
                    <h4 className="font-semibold text-lg mb-2 line-clamp-2 h-14 overflow-hidden">
                      {anime.title}
                    </h4>
                    <GenreBadges genres={anime.genre} maxDisplay={2} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </TooltipProvider>
  )
}

