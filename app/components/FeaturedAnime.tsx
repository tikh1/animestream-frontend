"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"
import { AnimeCard } from "@/components/AnimeCard"

const featuredAnime = [
  {
    id: 1,
    title: "One Piece",
    image: "/placeholder.svg?height=400&width=300&text=One+Piece",
    rating: 9.2,
    genres: ["Adventure", "Fantasy", "Comedy", "Drama", "Action", "Shounen", "Supernatural"],
    seasons: 20,
    episodesPerSeason: 50, // Ortalama bir değer, gerçekte değişebilir
  },
  {
    id: 2,
    title: "Fullmetal Alchemist: Brotherhood",
    image: "/placeholder.svg?height=400&width=300&text=Fullmetal+Alchemist",
    rating: 9.1,
    genres: ["Action", "Adventure", "Dark Fantasy", "Steampunk", "Military", "Shounen", "Magic"],
    seasons: 1,
    episodesPerSeason: 64,
  },
  {
    id: 3,
    title: "Death Note",
    image: "/placeholder.svg?height=400&width=300&text=Death+Note",
    rating: 9.0,
    genres: ["Mystery", "Psychological", "Supernatural", "Thriller", "Crime", "Shounen", "Police"],
    seasons: 1,
    episodesPerSeason: 37,
  },
  {
    id: 4,
    title: "Steins;Gate",
    image: "/placeholder.svg?height=400&width=300&text=Steins;Gate",
    rating: 9.0,
    genres: ["Sci-Fi", "Thriller", "Time Travel", "Psychological", "Drama", "Romance", "Mystery"],
    seasons: 2,
    episodesPerSeason: 24,
  },
  {
    id: 5,
    title: "Attack on Titan",
    image: "/placeholder.svg?height=400&width=300&text=Attack+on+Titan",
    rating: 9.0,
    genres: ["Action", "Dark Fantasy", "Post-apocalyptic", "Survival", "Mystery", "Shounen", "Gore"],
    seasons: 4,
    episodesPerSeason: 12,
  },
  {
    id: 6,
    title: "My Hero Academia",
    image: "/placeholder.svg?height=400&width=300&text=My+Hero+Academia",
    rating: 8.4,
    genres: ["Superhero", "Action", "Comedy", "School", "Shounen", "Supernatural", "Drama"],
    seasons: 5,
    episodesPerSeason: 25,
  },
]

export default function FeaturedAnime() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  const onSelect = () => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect]) // Added onSelect to dependencies

  return (
    <section className="py-8 sm:py-12 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Featured Anime</h2>
        <div className="relative">
          <div className="overflow-hidden mx-auto" ref={emblaRef}>
            <div className="flex -ml-4">
              {featuredAnime.map((anime) => (
                <div
                  key={anime.id}
                  className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_45%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
                >
                  <AnimeCard
                    anime={{
                      id: anime.id,
                      title: anime.title,
                      genre: anime.genres,
                      rating: anime.rating,
                      image: anime.image,
                      seasons: anime.seasons,
                      episodesPerSeason: anime.episodesPerSeason,
                    }}
                    variant="featured"
                    showStatus={false}
                    maxGenres={4}
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

