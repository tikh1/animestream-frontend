'use client'

import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

interface Anime {
  id: string;
  title: string;
  image: string;
  imdbRating: number;
  seasons: number;
}

interface AnimeSectionProps {
  title: string;
  animeList: Anime[];
}

export default function AnimeSection({ title, animeList }: AnimeSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true,
  })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="py-4 first:pt-6 last:pb-6 md:py-6 first:md:pt-8 last:md:pb-8">
      <div className="container mx-auto px-2">
        <h2 className="mb-3 md:mb-4 text-xl md:text-2xl font-bold">{title}</h2>
        
        <div className="relative">
          <div className="overflow-hidden -mx-2" ref={emblaRef}>
            <div className="flex">
              {animeList.map((anime, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-2 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]">
                  <AnimeCard anime={anime} />
                </div>
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 hidden md:flex"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 hidden md:flex"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <Card className="relative overflow-hidden group">
      <div className="absolute top-2 left-2 z-10">
        <div className="flex items-center gap-1 bg-yellow-500/90 text-black px-1.5 py-0.5 rounded-md backdrop-blur-sm text-sm">
          <Star className="w-3 h-3 fill-current" />
          <span className="font-medium">{anime.imdbRating}</span>
        </div>
      </div>
      <div className="absolute top-2 right-2 z-10">
        <div className="bg-primary/90 text-primary-foreground px-1.5 py-0.5 rounded-md backdrop-blur-sm text-sm">
          <span className="font-medium">{anime.seasons} Seasons</span>
        </div>
      </div>
      <Link href={`/anime/${anime.id}`}>
        <CardHeader className="p-0">
          <img 
            src={anime.image} 
            alt={anime.title} 
            className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </CardHeader>
        <CardContent className="p-3">
          <CardTitle className="text-base md:text-lg line-clamp-1">{anime.title}</CardTitle>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Button variant="outline" className="w-full bg-black text-white hover:bg-gray-800 text-sm">
            Watch Now
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}

