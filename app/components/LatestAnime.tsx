'use client'

import { AnimeCard } from "@/components/AnimeCard"

const latestAnime = [
  {
    id: 1,
    title: "Jujutsu Kaisen Season 2",
    image: "/placeholder.svg?height=400&width=300&text=Jujutsu+Kaisen",
    episode: 1,
    rating: 8.5,
  },
  {
    id: 2,
    title: "Demon Slayer: Swordsmith Village Arc",
    image: "/placeholder.svg?height=400&width=300&text=Demon+Slayer",
    episode: 3,
    rating: 9.1,
  },
  {
    id: 3,
    title: "Chainsaw Man",
    image: "/placeholder.svg?height=400&width=300&text=Chainsaw+Man",
    episode: 12,
    rating: 8.7,
  },
  {
    id: 4,
    title: "Spy x Family Part 2",
    image: "/placeholder.svg?height=400&width=300&text=Spy+x+Family",
    episode: 5,
    rating: 8.9,
  },
]

export default function LatestAnime() {
  return (
    <section className="py-12 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Latest Episodes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestAnime.map((anime) => (
            <div key={anime.id} className="flex">
              <AnimeCard
                anime={{
                  id: anime.id,
                  title: anime.title,
                  image: anime.image,
                  rating: anime.rating,
                  genre: [], // Placeholder genre
                  episodes: anime.episode,
                  status: `Episode ${anime.episode}`,
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

