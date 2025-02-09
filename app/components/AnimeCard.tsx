import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AnimeCardProps {
  anime: {
    id: number
    title: string
    genre: string[]
    year?: number
    rating: number
    image?: string
    rank?: number
    weeklyViews?: number
    episodes?: number
    status?: string
  }
  variant?: "default" | "compact" | "featured"
  showRank?: boolean
  showWeeklyViews?: boolean
  showStatus?: boolean
  maxGenres?: number
  className?: string
}

export function AnimeCard({
  anime,
  variant = "default",
  showRank = false,
  showWeeklyViews = false,
  showStatus = false,
  maxGenres = 2,
  className = "",
}: AnimeCardProps) {
  const imageUrl = anime.image || `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(anime.title)}`

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg group h-full flex flex-col bg-black/90 ${className}`}
    >
      <div className={`relative overflow-hidden ${variant === "compact" ? "aspect-[1/1]" : "aspect-[1/1.2]"}`}>
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={anime.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />

        {showRank && anime.rank && <div className="absolute top-2 left-2 text-white font-bold">#{anime.rank}</div>}

        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
          <span className="text-sm font-medium">{anime.rating.toFixed(1)}</span>
        </div>
      </div>

      <CardContent
        className={`p-4 flex-grow flex flex-col justify-between ${variant === "compact" ? "space-y-2" : "space-y-3"}`}
      >
        <div className="space-y-2">
          <h3 className={`font-medium text-white ${variant === "compact" ? "line-clamp-1" : "line-clamp-2"}`}>
            {anime.title}
          </h3>
          {variant !== "compact" && (
            <div className="flex flex-wrap gap-1">
              {anime.genre.slice(0, maxGenres).map((genre) => (
                <Badge key={genre} variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  {genre}
                </Badge>
              ))}
              {anime.genre.length > maxGenres && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 cursor-help">
                        +{anime.genre.length - maxGenres}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-white/20">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {anime.genre.slice(maxGenres).map((genre) => (
                          <Badge key={genre} variant="secondary" className="bg-white/10 text-white">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}
          {showWeeklyViews && anime.weeklyViews && (
            <p className="text-sm text-gray-400">{(anime.weeklyViews / 1000000).toFixed(1)}M haftalık görüntülenme</p>
          )}
          {showStatus && anime.status && (
            <Badge variant="outline" className="text-white border-white/20">
              {anime.status}
            </Badge>
          )}
          {variant === "featured" && anime.episodes && <p className="text-sm text-gray-400">{anime.episodes} Bölüm</p>}
        </div>

        <Link href={`/anime/${anime.id}`} className="w-full">
          <Button className="w-full bg-white text-black hover:bg-white/90" variant="secondary">
            <Play className="w-4 h-4 mr-2" />
            {variant === "compact" ? "İzle" : "Şimdi İzle"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

