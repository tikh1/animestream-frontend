"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Play, TrendingUp, Eye, Heart } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

function UserComments() {
  const [review, setReview] = useState({ user: "", comment: "", rating: 0 })

  useEffect(() => {
    const reviews = [
      { user: "Alice", comment: "Bu anime gerçekten harika!", rating: 5 },
      { user: "Bob", comment: "Karakterler çok iyi yazılmış.", rating: 4 },
      { user: "Charlie", comment: "Hikaye beni şaşırttı, kesinlikle tavsiye ederim.", rating: 5 },
      { user: "Diana", comment: "Animasyonlar muhteşem, gözlerimi alamadım.", rating: 4 },
      { user: "Eve", comment: "Beklediğimden çok daha iyiydi!", rating: 5 },
    ]
    const interval = setInterval(() => {
      setReview(reviews[Math.floor(Math.random() * reviews.length)])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
      <div className="flex items-center mb-2">
        <Avatar className="w-8 h-8 mr-2">
          <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${review.user[0]}`} alt={review.user} />
          <AvatarFallback>{review.user[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">{review.user}</p>
          <div className="flex">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm italic">"{review.comment}"</p>
    </div>
  )
}

const trendingAnime = [
  {
    id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    image: "/placeholder.svg?height=600&width=400&text=Demon+Slayer",
    rating: 8.9,
    genres: ["Action", "Fantasy"],
    trendingRank: 1,
    weeklyViews: 1500000,
    description:
      "In a world plagued by demons, a young boy becomes a demon slayer to avenge his family and cure his sister.",
    seasons: 3,
    episodesPerSeason: 12,
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    image: "/placeholder.svg?height=600&width=400&text=Jujutsu+Kaisen",
    rating: 8.7,
    genres: ["Action", "Supernatural"],
    trendingRank: 2,
    weeklyViews: 1400000,
    description:
      "A boy swallows a cursed object and becomes a sorcerer, fighting against curses to protect the living.",
    seasons: 2,
    episodesPerSeason: 24,
  },
  {
    id: 3,
    title: "My Hero Academia",
    image: "/placeholder.svg?height=600&width=400&text=My+Hero+Academia",
    rating: 8.4,
    genres: ["Superhero", "Action"],
    trendingRank: 3,
    weeklyViews: 1300000,
    description:
      "In a society where almost everyone has superpowers, a young boy without powers dreams of becoming the greatest hero.",
    seasons: 6,
    episodesPerSeason: 25,
  },
  {
    id: 4,
    title: "Attack on Titan",
    image: "/placeholder.svg?height=600&width=400&text=Attack+on+Titan",
    rating: 9.0,
    genres: ["Action", "Dark Fantasy"],
    trendingRank: 4,
    weeklyViews: 1200000,
    description:
      "Humanity is on the brink of extinction, facing colossal humanoid creatures known as Titans. Eren Yeager and his friends join the military to fight back.",
    seasons: 4,
    episodesPerSeason: 12,
  },
  {
    id: 5,
    title: "One Piece",
    image: "/placeholder.svg?height=600&width=400&text=One+Piece",
    rating: 8.9,
    genres: ["Adventure", "Fantasy"],
    trendingRank: 5,
    weeklyViews: 1100000,
    description:
      "Monkey D. Luffy sets out on a journey to become the King of the Pirates, exploring the Grand Line and gathering a crew of skilled individuals.",
    seasons: 20,
    episodesPerSeason: 50,
  },
  {
    id: 6,
    title: "Tokyo Revengers",
    image: "/placeholder.svg?height=600&width=400&text=Tokyo+Revengers",
    rating: 8.2,
    genres: ["Action", "Time Travel"],
    trendingRank: 6,
    weeklyViews: 1000000,
    description:
      "Takemichi Hanagaki travels back in time to save his ex-girlfriend and change the course of events in a violent gang.",
    seasons: 2,
    episodesPerSeason: 24,
  },
  {
    id: 7,
    title: "Black Clover",
    image: "/placeholder.svg?height=600&width=400&text=Black+Clover",
    rating: 8.3,
    genres: ["Fantasy", "Magic"],
    trendingRank: 7,
    weeklyViews: 950000,
    description:
      "Asta, a boy born without magic in a world of magic, strives to become the Wizard King through sheer determination and hard work.",
    seasons: 4,
    episodesPerSeason: 170,
  },
  {
    id: 8,
    title: "Dr. Stone",
    image: "/placeholder.svg?height=600&width=400&text=Dr.+Stone",
    rating: 8.4,
    genres: ["Sci-Fi", "Adventure"],
    trendingRank: 8,
    weeklyViews: 900000,
    description:
      "Thousands of years after a mysterious petrification event, Senku Ishigami awakens and uses science to rebuild civilization.",
    seasons: 3,
    episodesPerSeason: 11,
  },
  {
    id: 9,
    title: "Haikyuu!!",
    image: "/placeholder.svg?height=600&width=400&text=Haikyuu!!",
    rating: 8.7,
    genres: ["Sports", "Comedy"],
    trendingRank: 9,
    weeklyViews: 850000,
    description:
      "Shoyo Hinata's passion for volleyball leads him to join the Karasuno High School team, where he strives to become a great player.",
    seasons: 4,
    episodesPerSeason: 25,
  },
  {
    id: 10,
    title: "The Promised Neverland",
    image: "/placeholder.svg?height=600&width=400&text=The+Promised+Neverland",
    rating: 8.5,
    genres: ["Mystery", "Horror"],
    trendingRank: 10,
    weeklyViews: 800000,
    description:
      "Orphaned children living in a seemingly idyllic orphanage discover a dark secret about their existence and fight for their freedom.",
    seasons: 2,
    episodesPerSeason: 12,
  },
]

export default function TrendingPage() {
  const [activeTab, setActiveTab] = useState("trending")
  const [selectedAnime, setSelectedAnime] = useState(trendingAnime[0])

  const handleAnimeSelect = (anime) => {
    setSelectedAnime(anime)
  }

  const sortedAnime = [...trendingAnime].sort((a, b) => {
    if (activeTab === "trending") return a.trendingRank - b.trendingRank
    if (activeTab === "rating") return b.rating - a.rating
    if (activeTab === "views") return b.weeklyViews - a.weeklyViews
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div id="trending-content" className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Trending Anime</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trending" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="rating" className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Top Rated
            </TabsTrigger>
            <TabsTrigger value="views" className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Most Viewed
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section for Selected Anime */}
            <div className="mb-6" id="hero-section">
              <Card className="overflow-hidden max-w-5xl mx-auto shadow-lg">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-4 min-h-[350px] md:min-h-[450px]">
                    <div className="relative w-full h-full">
                      <img
                        src={selectedAnime.image || "/placeholder.svg"}
                        alt={selectedAnime.title}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-sm font-bold">
                        #{selectedAnime.trendingRank}
                      </div>
                      <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-semibold">{selectedAnime.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6 lg:p-8 flex flex-col">
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 sticky top-0 bg-background/80 backdrop-blur-sm py-2">
                        {selectedAnime.title}
                      </h2>
                      <div className="flex-grow">
                        <p className="text-sm text-muted-foreground mb-4">{selectedAnime.description}</p>
                        <div className="flex items-center mb-4">
                          <Badge variant="secondary" className="text-xs mr-2">
                            {(selectedAnime.weeklyViews / 1000000).toFixed(1)}M haftalık görüntülenme
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedAnime.genres.map((genre) => (
                            <Badge key={genre} variant="outline" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                        <UserComments />
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/anime/${selectedAnime.id}`} className="flex-[2]">
                          <Button className="w-full">
                            <Play className="w-4 h-4 mr-2" />
                            Şimdi İzle
                          </Button>
                        </Link>
                        <Button variant="outline" className="flex-1">
                          <Heart className="w-4 h-4 mr-2" />
                          Favoriye Ekle
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Grid for all trending anime, including the top one */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {sortedAnime.map((anime, index) => (
                <motion.div
                  key={anime.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    className="overflow-hidden transition-all duration-300 hover:shadow-lg group h-full bg-black/90 cursor-pointer"
                    onClick={() => handleAnimeSelect(anime)}
                  >
                    <div className="relative aspect-[3/4]">
                      <img
                        src={`/placeholder.svg?height=400&width=300&text=${encodeURIComponent(anime.title)}`}
                        alt={anime.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                      <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
                        <span className="text-sm font-medium">{anime.rating.toFixed(1)}</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/40"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-semibold text-white text-lg md:text-xl line-clamp-2 mb-1">{anime.title}</h3>
                        <p className="text-xs md:text-sm text-gray-300">
                          {anime.seasons} Sezon • {anime.episodesPerSeason} Bölüm/Sezon
                        </p>
                        <p className="text-xs md:text-sm text-gray-300 mt-1">
                          {(anime.weeklyViews / 1000000).toFixed(1)}M haftalık görüntülenme
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

