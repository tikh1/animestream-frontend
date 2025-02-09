import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface EpisodeInfoProps {
  episode: {
    title: string
    number: number
    season: number
    description: string
  }
  animeId: string
}

export default function EpisodeInfo({ episode, animeId }: EpisodeInfoProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-lg font-semibold">
            Season {episode.season} • Episode {episode.number}
          </p>
          {/* Removed: <h2 className="text-2xl font-bold">{episode.title}</h2> */}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button variant="outline" size="sm">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <p>{episode.description}</p>
      <div className="pt-4">
        <Link href={`/anime/${animeId}`}>
          <Button variant="link">Back to Anime Details</Button>
        </Link>
      </div>
    </div>
  )
}

