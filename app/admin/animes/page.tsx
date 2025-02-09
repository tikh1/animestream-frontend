"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { MultiSelect } from "@/components/ui/multi-select"
import { ChevronDown, ChevronUp, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { GenreBadges } from "@/components/GenreBadges"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Güncellenmiş örnek anime verileri
const animes = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Anime ${i + 1}`,
  genre: [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Sci-Fi",
    "Romance",
    "Horror",
    "Mystery",
    "Slice of Life",
  ]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 4) + 2), // 2 ila 5 rastgele tür
  status: ["Yayında", "Tamamlandı", "Yakında"][Math.floor(Math.random() * 3)],
  episodes: Math.floor(Math.random() * 24) + 1,
  rating: (Math.random() * 5 + 5).toFixed(1),
  releaseDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split("T")[0],
  season: Math.floor(Math.random() * 100) + 1,
  uploadDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split("T")[0],
  uploadUser: `User${Math.floor(Math.random() * 10) + 1}`,
}))

export default function AnimesPage() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [animeId, setAnimeId] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [episodeRange, setEpisodeRange] = useState([0, 100])
  const [ratingRange, setRatingRange] = useState([0, 10])
  const [releaseStartDate, setReleaseStartDate] = useState("")
  const [releaseEndDate, setReleaseEndDate] = useState("")
  const [uploadStartDate, setUploadStartDate] = useState("")
  const [uploadEndDate, setUploadEndDate] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("uploadDate-desc")
  const [seasonStart, setSeasonStart] = useState("0")
  const [seasonEnd, setSeasonEnd] = useState("100")
  const [uploadUser, setUploadUser] = useState("")
  const [selectedAnime, setSelectedAnime] = useState<(typeof animes)[0] | null>(null)
  const itemsPerPage = 10

  const filteredAnimes = animes
    .filter(
      (anime) =>
        (searchTerm === "" || anime.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (animeId === "" || anime.id.toString() === animeId) &&
        (selectedGenres.length === 0 || selectedGenres.every((genre) => anime.genre.includes(genre))) &&
        (statusFilter === "all" || anime.status === statusFilter) &&
        Number.parseInt(anime.season) >= Number.parseInt(seasonStart) &&
        Number.parseInt(anime.season) <= Number.parseInt(seasonEnd) &&
        anime.episodes >= episodeRange[0] &&
        anime.episodes <= episodeRange[1] &&
        Number.parseFloat(anime.rating) >= ratingRange[0] &&
        Number.parseFloat(anime.rating) <= ratingRange[1] &&
        (!releaseStartDate || new Date(anime.releaseDate) >= new Date(releaseStartDate)) &&
        (!releaseEndDate || new Date(anime.releaseDate) <= new Date(releaseEndDate)) &&
        (!uploadStartDate || new Date(anime.uploadDate) >= new Date(uploadStartDate)) &&
        (!uploadEndDate || new Date(anime.uploadDate) <= new Date(uploadEndDate)) &&
        (uploadUser === "" || anime.uploadUser.toLowerCase().includes(uploadUser.toLowerCase())),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "uploadDate-desc":
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        case "uploadDate-asc":
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        case "releaseDate-desc":
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        case "releaseDate-asc":
          return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        default:
          return 0
      }
    })

  const pageCount = Math.ceil(filteredAnimes.length / itemsPerPage)
  const paginatedAnimes = filteredAnimes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-5">Anime Yönetimi</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="w-full">
            <Input placeholder="Anime adı" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="w-full">
            <MultiSelect
              options={[
                { label: "Aksiyon", value: "Action" },
                { label: "Macera", value: "Adventure" },
                { label: "Komedi", value: "Comedy" },
                { label: "Drama", value: "Drama" },
                { label: "Fantezi", value: "Fantasy" },
                { label: "Bilim Kurgu", value: "Sci-Fi" },
                { label: "Romantik", value: "Romance" },
                { label: "Korku", value: "Horror" },
                { label: "Gizem", value: "Mystery" },
                { label: "Hayat Dilimi", value: "Slice of Life" },
              ]}
              selected={selectedGenres}
              onChange={setSelectedGenres}
              placeholder="Türleri seçin"
            />
          </div>
          <div className="w-full">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sıralama" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uploadDate-desc">Yüklenme tarihi (Yeni-Eski)</SelectItem>
                <SelectItem value="uploadDate-asc">Yüklenme tarihi (Eski-Yeni)</SelectItem>
                <SelectItem value="releaseDate-desc">Yayın tarihi (Yeni-Eski)</SelectItem>
                <SelectItem value="releaseDate-asc">Yayın tarihi (Eski-Yeni)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2"
          >
            {showAdvancedFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            Gelişmiş Filtreler
          </Button>
        </div>

        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 mb-4">
                {/* Row 1 */}
                <div className="w-full">
                  <label className="text-sm font-medium">Anime ID</label>
                  <Input
                    className="mt-1"
                    placeholder="Anime ID"
                    value={animeId}
                    onChange={(e) => setAnimeId(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm font-medium">Yayın Tarihi Aralığı</label>
                  <div className="flex gap-2 mt-1">
                    <Input type="date" value={releaseStartDate} onChange={(e) => setReleaseStartDate(e.target.value)} />
                    <Input type="date" value={releaseEndDate} onChange={(e) => setReleaseEndDate(e.target.value)} />
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-sm font-medium">Sezon Aralığı</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={seasonStart}
                      onChange={(e) => setSeasonStart(e.target.value)}
                      min={0}
                      max={100}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={seasonEnd}
                      onChange={(e) => setSeasonEnd(e.target.value)}
                      min={0}
                      max={100}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="w-full flex flex-col justify-end">
                  <label className="text-sm font-medium mb-1">Durum</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tüm durumlar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Durumlar</SelectItem>
                      <SelectItem value="Yayında">Yayında</SelectItem>
                      <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                      <SelectItem value="Yakında">Yakında</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                  <label className="text-sm font-medium">Yüklenme Tarihi Aralığı</label>
                  <div className="flex gap-2 mt-1">
                    <Input type="date" value={uploadStartDate} onChange={(e) => setUploadStartDate(e.target.value)} />
                    <Input type="date" value={uploadEndDate} onChange={(e) => setUploadEndDate(e.target.value)} />
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-sm font-medium">Bölüm Aralığı</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={episodeRange[0]}
                      onChange={(e) => setEpisodeRange([Number.parseInt(e.target.value), episodeRange[1]])}
                      min={0}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={episodeRange[1]}
                      onChange={(e) => setEpisodeRange([episodeRange[0], Number.parseInt(e.target.value)])}
                      min={0}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="w-full">
                  <label className="text-sm font-medium">Yükleyen Kullanıcı</label>
                  <Input
                    className="mt-1"
                    placeholder="Yükleyen kullanıcı"
                    value={uploadUser}
                    onChange={(e) => setUploadUser(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm font-medium">Puan Aralığı</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={ratingRange[0]}
                      onChange={(e) => setRatingRange([Number.parseFloat(e.target.value), ratingRange[1]])}
                      min={0}
                      max={10}
                      step={0.1}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={ratingRange[1]}
                      onChange={(e) => setRatingRange([ratingRange[0], Number.parseFloat(e.target.value)])}
                      min={0}
                      max={10}
                      step={0.1}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mt-6">
        {paginatedAnimes.map((anime) => (
          <Card
            key={anime.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg group h-full flex flex-col"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={`/placeholder.svg?height=450&width=300&text=${encodeURIComponent(anime.title)}`}
                alt={anime.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full flex items-center">
                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                <span className="text-xs font-semibold">{anime.rating}</span>
              </div>
            </div>
            <CardContent className="p-4 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold line-clamp-2">{anime.title}</h3>
                <div className="space-y-1.5">
                  <p className="text-xs text-muted-foreground">{anime.releaseDate}</p>
                  <p className="text-sm text-muted-foreground">
                    Son Yüklenen: Sezon {anime.season}, Bölüm {anime.episodes}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm" className="flex-1">
                  Git
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedAnime(anime)}>
                  Detaylar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalCount={filteredAnimes.length}
          pageSize={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <Dialog open={!!selectedAnime} onOpenChange={() => setSelectedAnime(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-6">{selectedAnime?.title}</DialogTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-3">
                <p className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium">IMDb Puanı:</span>
                  <span className="ml-2 text-muted-foreground">{selectedAnime?.rating}</span>
                </p>
                <p className="flex items-center">
                  <span className="text-sm font-medium">Yayın Tarihi:</span>
                  <span className="ml-2 text-muted-foreground">{selectedAnime?.releaseDate}</span>
                </p>
              </div>
              <div className="space-y-3">
                <p className="flex items-center">
                  <span className="text-sm font-medium">Toplam Sezon:</span>
                  <span className="ml-2 text-muted-foreground">{selectedAnime?.season}</span>
                </p>
                <p className="flex items-center">
                  <span className="text-sm font-medium">Sezon Başına Bölüm:</span>
                  <span className="ml-2 text-muted-foreground">{selectedAnime?.episodes}</span>
                </p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Son Eklenen:</p>
                  <p className="text-sm text-muted-foreground">
                    Sezon {selectedAnime?.season} Bölüm {selectedAnime?.episodes}
                  </p>
                </div>
              </div>
            </div>
          </DialogHeader>
          <div className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {[...Array(Number(selectedAnime?.season || 0))].map((_, index) => (
                <AccordionItem key={index} value={`season-${index + 1}`}>
                  <AccordionTrigger
                    className={index >= Number(selectedAnime?.season || 0) - 1 ? "text-muted-foreground" : ""}
                  >
                    Sezon {index + 1}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(24)].map((_, episodeIndex) => (
                        <Button
                          key={episodeIndex}
                          variant="outline"
                          size="sm"
                          className={`${episodeIndex >= Number(selectedAnime?.episodes || 0) ? "text-muted-foreground" : ""}`}
                          disabled={episodeIndex >= Number(selectedAnime?.episodes || 0)}
                        >
                          Bölüm {episodeIndex + 1}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

