import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

interface RelatedEpisodesProps {
  currentEpisodeId: string
  animeId: string
}

// This would typically come from an API or database
const episodeList = [
  { id: '1', title: 'To You, 2,000 Years Later', thumbnail: '/placeholder.svg?height=90&width=160&text=EP01' },
  { id: '2', title: 'That Day', thumbnail: '/placeholder.svg?height=90&width=160&text=EP02' },
  { id: '3', title: 'A Dim Light Amid Despair', thumbnail: '/placeholder.svg?height=90&width=160&text=EP03' },
  { id: '4', title: 'The Night of the Closing Ceremony', thumbnail: '/placeholder.svg?height=90&width=160&text=EP04' },
  { id: '5', title: 'First Battle', thumbnail: '/placeholder.svg?height=90&width=160&text=EP05' },
]

export default function RelatedEpisodes({ currentEpisodeId, animeId }: RelatedEpisodesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Related Episodes</h2>
      <div className="space-y-2">
        {episodeList.map((episode) => (
          <Link key={episode.id} href={`/anime/${animeId}/episode/${episode.id}`}>
            <Card className={`hover:bg-accent transition-colors ${episode.id === currentEpisodeId ? 'bg-accent' : ''}`}>
              <CardContent className="p-2 flex items-center space-x-2">
                <img src={episode.thumbnail} alt={episode.title} className="w-20 h-12 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Episode {episode.id}</p>
                  <p className="text-xs text-muted-foreground truncate">{episode.title}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

