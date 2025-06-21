'use client'

import { useState, useEffect } from "react"
import { AnimeCard } from "@/components/AnimeCard"
import fetchAnimeList from "@/services/anime/anime_list"
import { Skeleton } from "@/components/ui/skeleton"

export default function LatestAnime() {
  const [animes, setAnimes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchAnimeList()
        // Sort by rating to get the best anime first, then take the first 4
        const sortedAnimes = data
          .sort((a: any, b: any) => b.rating - a.rating)
          .slice(0, 4)
        setAnimes(sortedAnimes)
      } catch (err) {
        setError('Anime verileri yüklenirken hata oluştu')
        console.error('Latest anime fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="py-12 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Episodes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex">
                <Skeleton className="w-full h-64 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Episodes</h2>
          <div className="text-center text-red-500">
            {error}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Latest Episodes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {animes.map((anime) => (
            <div key={anime.id} className="flex">
              <AnimeCard
                anime={{
                  id: anime.id,
                  name: anime.name,
                  slug: anime.slug,
                  thumbnail: anime.thumbnail,
                  rating: anime.rating,
                  genre: anime.genre,
                  episodes: anime.episodesPerSeason,
                  status: `Episode ${anime.episodesPerSeason || 1}`,
                }}
                variant="compact"
                showStatus={true}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

