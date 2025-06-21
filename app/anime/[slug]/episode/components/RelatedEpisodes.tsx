'use client'

import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { fetchAnimeWithEpisodes, Episode, AnimeData } from "@/services/anime/episode"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface RelatedEpisodesProps {
  currentEpisodeId: string
  animeId: string
}

export default function RelatedEpisodes({ currentEpisodeId, animeId }: RelatedEpisodesProps) {
  const [animeData, setAnimeData] = useState<AnimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSeasonId, setCurrentSeasonId] = useState<number | null>(null)

  useEffect(() => {
    const loadAnimeData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchAnimeWithEpisodes(animeId)
        console.log('Anime Data:', data)
        setAnimeData(data)
        
        // Find the current episode to get its season_id
        let foundSeasonId: number | null = null
        data.seasons?.forEach(season => {
          //console.log('Checking season:', season.id, season.name)
          season.episodes?.forEach(episode => {
            //console.log('Checking episode:', episode.slug, 'vs currentEpisodeId:', currentEpisodeId)
            if (episode.slug === currentEpisodeId) {
              foundSeasonId = season.id
              //console.log('Found season ID:', foundSeasonId)
            }
          })
        })
        //console.log('Final foundSeasonId:', foundSeasonId)
        setCurrentSeasonId(foundSeasonId)
      } catch (err) {
        //console.error("Error loading anime data:", err)
        setError("Failed to load episodes")
      } finally {
        setLoading(false)
      }
    }

    loadAnimeData()
  }, [animeId, currentEpisodeId])

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Related Episodes</h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2 text-sm">Loading episodes...</span>
        </div>
      </div>
    )
  }

  if (error || !animeData) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Related Episodes</h2>
        <div className="text-sm text-muted-foreground">
          Failed to load episodes
        </div>
      </div>
    )
  }

  // Get episodes only from the current season
  const currentSeason = animeData.seasons?.find(season => season.id === currentSeasonId)
  //console.log('Current Season ID:', currentSeasonId)
  //console.log('Found Current Season:', currentSeason)
  const seasonEpisodes = currentSeason?.episodes || []
  //console.log('Season Episodes:', seasonEpisodes)

  // Sort episodes by ID
  const sortedEpisodes = seasonEpisodes.sort((a, b) => a.id - b.id)
  //console.log('Sorted Episodes:', sortedEpisodes)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Related Episodes</h2>
      {currentSeason && (
        <p className="text-sm text-muted-foreground">{currentSeason.name}</p>
      )}
      <div className="space-y-2">
        {sortedEpisodes.map((episode) => (
          <Link key={episode.id} href={`/anime/${animeId}/episode/${episode.slug}`}>
            <Card className={`hover:bg-accent transition-colors ${episode.slug === currentEpisodeId ? 'bg-accent' : ''}`}>
              <CardContent className="p-2 flex items-center space-x-2">
                <img 
                  src={episode.thumbnail || animeData.thumbnail || '/placeholder.svg?height=90&width=160&text=EP'} 
                  alt={episode.name} 
                  className="w-20 h-12 object-cover rounded" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Episode {episode.id}</p>
                  <p className="text-xs text-muted-foreground truncate">{episode.name}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

