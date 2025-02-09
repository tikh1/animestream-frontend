"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { AnimeCard } from "@/components/AnimeCard"

const newReleases = [
  {
    id: 1,
    title: "Chainsaw Man",
    image: "/placeholder.svg?height=400&width=300&text=Chainsaw+Man",
    releaseDate: "October 2022",
    genre: ["Action", "Supernatural", "Horror", "Dark Fantasy", "Comedy", "Gore", "Demons"],
    rating: 8.7,
    seasons: 1,
  },
  {
    id: 2,
    title: "Spy x Family Part 2",
    image: "/placeholder.svg?height=400&width=300&text=Spy+x+Family",
    releaseDate: "October 2022",
    genre: ["Action", "Comedy", "Slice of Life", "Shounen", "Family", "Espionage", "Supernatural"],
    rating: 8.9,
    seasons: 2,
  },
  {
    id: 3,
    title: "Bleach: Thousand-Year Blood War",
    image: "/placeholder.svg?height=400&width=300&text=Bleach",
    releaseDate: "October 2022",
    genre: ["Action", "Supernatural", "Adventure", "Shounen", "Fantasy", "Swordplay", "Afterlife"],
    rating: 9.1,
    seasons: 17,
  },
  {
    id: 4,
    title: "My Hero Academia Season 6",
    image: "/placeholder.svg?height=400&width=300&text=My+Hero+Academia",
    releaseDate: "October 2022",
    genre: ["Superhero", "Action", "School", "Shounen", "Comedy", "Drama", "Superpowers"],
    rating: 8.4,
    seasons: 6,
  },
  {
    id: 5,
    title: "Blue Lock",
    image: "/placeholder.svg?height=400&width=300&text=Blue+Lock",
    releaseDate: "October 2022",
    genre: ["Sports", "Psychological", "Shounen", "Team Sports", "Drama", "Competition", "Football"],
    rating: 8.3,
    seasons: 1,
  },
  {
    id: 6,
    title: "Mob Psycho 100 III",
    image: "/placeholder.svg?height=400&width=300&text=Mob+Psycho+100",
    releaseDate: "October 2022",
    genre: ["Action", "Comedy", "Supernatural", "Psychological", "Slice of Life", "Psychic", "School"],
    rating: 8.8,
    seasons: 3,
  },
]

export default function NewReleases() {
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
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">New Releases</h2>
        <div className="relative">
          <div className="overflow-hidden mx-auto" ref={emblaRef}>
            <div className="flex -ml-4">
              {newReleases.map((anime) => (
                <div
                  key={anime.id}
                  className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_45%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
                >
                  <AnimeCard
                    anime={{
                      id: anime.id,
                      title: anime.title,
                      genre: anime.genre,
                      rating: anime.rating,
                      image: anime.image,
                      status: "New",
                      year: new Date(anime.releaseDate).getFullYear(),
                    }}
                    variant="default"
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

