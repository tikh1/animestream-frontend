"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { AnimeCard } from "@/components/AnimeCard"
import fetchAnimeList from "@/services/anime/anime_list"
import { Skeleton } from "@/components/ui/skeleton"

export default function NewReleases() {
  const [animes, setAnimes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchAnimeList()
        // Sort by rating to get the best anime first, then take the first 6
        const sortedAnimes = data
          .sort((a: any, b: any) => b.rating - a.rating)
          .slice(0, 6)
        setAnimes(sortedAnimes)
      } catch (err) {
        setError('Anime verileri yüklenirken hata oluştu')
        console.error('New releases fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  if (loading) {
    return (
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">New Releases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex">
                <Skeleton className="w-full h-80 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">New Releases</h2>
          <div className="text-center text-red-500">
            {error}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">New Releases</h2>
        <div className="relative">
          <div className="overflow-hidden mx-auto" ref={emblaRef}>
            <div className="flex -ml-4">
              {animes.map((anime) => (
                <div
                  key={anime.id}
                  className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_45%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
                >
                  <AnimeCard
                    anime={{
                      id: anime.id,
                      name: anime.name,
                      slug: anime.slug,
                      genre: anime.genre,
                      rating: anime.rating,
                      thumbnail: anime.thumbnail,
                      status: "New",
                      year: anime.year,
                    }}
                    variant="default"
                    showStatus={false}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={scrollPrev} disabled={!canScrollPrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={scrollNext} disabled={!canScrollNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 hidden md:flex"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 hidden md:flex"
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

