import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface AnimeCardProps {
  anime: {
    id: number
    name: string
    genre: string[]
    year?: number
    rating: number
    image?: string
    rank?: number
    weeklyViews?: number
    episodes?: number
    status?: string
    seasons?: number
    episodesPerSeason?: number
  }
  variant?: "default" | "compact" | "featured"
  showRank?: boolean
  showWeeklyViews?: boolean
  showStatus?: boolean
  className?: string
}

export function AnimeCard({
  anime,
  variant = "default",
  showRank = false,
  showWeeklyViews = false,
  showStatus = false,
  className = "",
}: AnimeCardProps) {
  const imageUrl = anime.image || `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(anime.name)}`

  return (
    <Link href={`/anime/${anime.id}`} className="block h-full">
      <Card
        className={`overflow-hidden transition-all duration-300 hover:shadow-lg group h-full bg-black/90 ${className}`}
      >
        <div className={`relative overflow-hidden ${variant === "compact" ? "aspect-[1/1]" : "aspect-[3/4]"}`}>
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={anime.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

          {showRank && anime.rank && <div className="absolute top-2 left-2 text-white font-bold">#{anime.rank}</div>}

          <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
            <span className="text-sm font-medium">{anime.rating.toFixed(1)}</span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40"
          >
            <div></div>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3
              className={`font-semibold text-white ${
                variant === "compact" ? "text-base" : "text-lg md:text-xl"
              } line-clamp-2 mb-1`}
            >
              {anime.name}
            </h3>
            {anime.seasons && anime.episodesPerSeason && (
              <p className="text-xs md:text-sm text-gray-300">
                {anime.seasons} Sezon • {anime.episodesPerSeason} Bölüm/Sezon
              </p>
            )}
            {showWeeklyViews && anime.weeklyViews && (
              <p className="text-xs md:text-sm text-gray-300 mt-1">
                {(anime.weeklyViews / 1000000).toFixed(1)}M haftalık görüntülenme
              </p>
            )}
            {showStatus && anime.status && <p className="text-xs md:text-sm text-white mt-1">{anime.status}</p>}
            {variant === "featured" && anime.episodes && (
              <p className="text-xs md:text-sm text-gray-300 mt-1">{anime.episodes} Bölüm</p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}

