"use client";

import { notFound } from 'next/navigation'
import AnimeDetail from './components/AnimeDetail'
import SeasonEpisodes from './components/SeasonEpisodes'
import Comments from './components/Comments'
import { useEffect, useState } from 'react'
import { fetchAnimeDetail, AnimeData } from '@/services/anime/anime_detail'

interface AnimeDetailPageProps {
  params: {
    slug: string
  }
}

export default function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const [anime, setAnime] = useState<AnimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await fetchAnimeDetail(params.slug)
        console.log('Fetched Anime Data:', data)
        console.log('Anime Comments:', data.comments)
        setAnime(data)
      } catch (err) {
        setError("Anime bulunamadı.")
      } finally {
        setLoading(false)
      }
    }
    fetchAnime()
  }, [params.slug])

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center">Yükleniyor...</div>
  if (error || !anime) return <div className="min-h-screen bg-background flex items-center justify-center text-red-500">{error || "Anime bulunamadı."}</div>

  return (
    <div className="min-h-screen bg-background">
      <AnimeDetail params={{ slug: params.slug }} />
      <SeasonEpisodes animeId={params.slug} seasons={anime.seasons} />
      <Comments animeId={String(anime.id)} comments={anime.comments} />
    </div>
  )
}

