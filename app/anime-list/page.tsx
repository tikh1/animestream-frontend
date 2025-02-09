"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/multi-select"
import { AnimeCard } from "@/components/AnimeCard"
import { Pagination } from "./components/Pagination"

// Örnek anime verileri - Her animeye 4 ekstra tür eklendi
const animeData = [
  {
    id: 1,
    title: "Attack on Titan",
    genre: ["Action", "Dark Fantasy", "Post-apocalyptic", "Mystery", "Military Fiction", "Horror"],
    year: 2013,
    rating: 9.0,
    seasons: 4,
    episodesPerSeason: 25,
  },
  {
    id: 2,
    title: "Death Note",
    genre: ["Mystery", "Psychological Thriller", "Supernatural", "Crime Fiction", "Drama", "Detective"],
    year: 2006,
    rating: 9.0,
    seasons: 1,
    episodesPerSeason: 37,
  },
  {
    id: 3,
    title: "Fullmetal Alchemist: Brotherhood",
    genre: ["Adventure", "Dark Fantasy", "Steampunk", "Military Fiction", "Comedy", "Drama"],
    year: 2009,
    rating: 9.1,
    seasons: 1,
    episodesPerSeason: 64,
  },
  {
    id: 4,
    title: "One Punch Man",
    genre: ["Action", "Comedy", "Superhero", "Parody", "Science Fiction", "Martial Arts"],
    year: 2015,
    rating: 8.8,
    seasons: 2,
    episodesPerSeason: 12,
  },
  {
    id: 5,
    title: "My Hero Academia",
    genre: ["Superhero", "Action", "School Life", "Comedy", "Drama", "Science Fiction"],
    year: 2016,
    rating: 8.4,
    seasons: 6,
    episodesPerSeason: 25,
  },
]

export default function AnimeListPage() {
  const [animes] = useState(animeData)
  const [filteredAnimes, setFilteredAnimes] = useState(animeData)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("title")
  const itemsPerPage = 10

  useEffect(() => {
    let result = [...animes]

    // Search filter
    if (searchTerm) {
      result = result.filter((anime) => anime.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      result = result.filter((anime) => selectedGenres.some((genre) => anime.genre.includes(genre)))
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title)
      if (sortBy === "year") return b.year - a.year
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

    setFilteredAnimes(result)
    setCurrentPage(1)
  }, [animes, searchTerm, selectedGenres, sortBy])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredAnimes.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Anime Listesi</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Anime ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Sıralama" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Başlık</SelectItem>
            <SelectItem value="year">Yıl</SelectItem>
            <SelectItem value="rating">Puan</SelectItem>
          </SelectContent>
        </Select>

        <MultiSelect
          options={[
            { value: "Action", label: "Aksiyon" },
            { value: "Adventure", label: "Macera" },
            { value: "Comedy", label: "Komedi" },
            { value: "Drama", label: "Drama" },
            { value: "Fantasy", label: "Fantezi" },
            { value: "Horror", label: "Korku" },
            { value: "Mystery", label: "Gizem" },
            { value: "Psychological", label: "Psikolojik" },
            { value: "Romance", label: "Romantik" },
            { value: "Sci-Fi", label: "Bilim Kurgu" },
            { value: "Slice of Life", label: "Günlük Yaşam" },
            { value: "Supernatural", label: "Doğaüstü" },
            { value: "Thriller", label: "Gerilim" },
          ]}
          selected={selectedGenres}
          onChange={setSelectedGenres}
          placeholder="Türleri seçin"
          className="md:w-1/3"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {currentItems.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={{
              id: anime.id,
              title: anime.title,
              genre: anime.genre,
              year: anime.year,
              rating: anime.rating,
              seasons: anime.seasons,
              episodesPerSeason: anime.episodesPerSeason,
            }}
            variant="default"
            showRank={false}
            maxGenres={3}
          />
        ))}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredAnimes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

