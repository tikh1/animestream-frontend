"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { MultiSelect } from "@/components/ui/multi-select"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { GenreBadges } from "@/components/GenreBadges"
import { Check, Ban } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

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
  seasonId: Math.floor(Math.random() * 100) + 1, // Added seasonId
  episodeId: Math.floor(Math.random() * 24) + 1, // Added episodeId
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
  const itemsPerPage = 10
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAnime, setSelectedAnime] = useState<(typeof animes)[0] | null>(null)

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
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

      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Anime Adı</TableHead>
              <TableHead>Başlık</TableHead>
              <TableHead>Sezon</TableHead>
              <TableHead>Bölüm</TableHead>
              <TableHead>Yayın Tarihi</TableHead>
              <TableHead>Yüklenme Tarihi</TableHead>
              <TableHead>Yükleyen Kullanıcı</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAnimes.map((anime) => (
              <TableRow key={anime.id}>
                <TableCell>{anime.id}</TableCell>
                <TableCell>{anime.title}</TableCell>
                <TableCell>{`${anime.title} S${anime.seasonId}E${anime.episodeId}`}</TableCell>
                <TableCell>{anime.seasonId}</TableCell>
                <TableCell>{anime.episodeId}</TableCell>
                <TableCell>{anime.releaseDate}</TableCell>
                <TableCell>{anime.uploadDate}</TableCell>
                <TableCell>{anime.uploadUser}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      anime.status === "Yayında" ? "success" : anime.status === "İşleniyor" ? "warning" : "destructive"
                    }
                  >
                    {anime.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAnime(anime)
                      setIsDialogOpen(true)
                    }}
                  >
                    Düzenle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalCount={filteredAnimes.length}
          pageSize={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Anime Bölüm Detayları</DialogTitle>
            <DialogDescription>Yüklenen anime bölümünün bilgileri aşağıda listelenmiştir.</DialogDescription>
          </DialogHeader>
          {selectedAnime && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                // Here you would typically make an API call to update the anime
                console.log("Updated anime:", selectedAnime)
                setIsDialogOpen(false)
              }}
            >
              <div className="grid grid-cols-[1fr_400px] gap-8">
                {/* Video Preview Section */}
                <div className="space-y-4">
                  <div className="aspect-video bg-black/90 rounded-lg overflow-hidden">
                    <video
                      src="/placeholder.mp4"
                      poster={`/placeholder.svg?height=400&width=600&text=${selectedAnime.title}`}
                      controls
                      className="w-full h-full object-contain"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Video Boyutu</span>
                      <p className="text-sm text-muted-foreground">1.2 GB</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Video Süresi</span>
                      <p className="text-sm text-muted-foreground">24:15</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Video Formatı</span>
                      <p className="text-sm text-muted-foreground">MP4 (H.264)</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Çözünürlük</span>
                      <p className="text-sm text-muted-foreground">1920x1080</p>
                    </div>
                  </div>
                </div>

                {/* Form Fields Section */}
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="font-medium">ID:</span>
                      <span className="col-span-3">{selectedAnime.id}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="font-medium">Anime Adı:</span>
                      <Input
                        className="col-span-3"
                        value={selectedAnime.title}
                        onChange={(e) => setSelectedAnime({ ...selectedAnime, title: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="font-medium">Sezon:</span>
                      <Input
                        className="col-span-3"
                        type="number"
                        value={selectedAnime.seasonId}
                        onChange={(e) =>
                          setSelectedAnime({ ...selectedAnime, seasonId: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="font-medium">Bölüm:</span>
                      <Input
                        className="col-span-3"
                        type="number"
                        value={selectedAnime.episodeId}
                        onChange={(e) =>
                          setSelectedAnime({ ...selectedAnime, episodeId: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="font-medium">Yayın Tarihi:</span>
                      <Input
                        className="col-span-3"
                        type="date"
                        value={selectedAnime.releaseDate}
                        onChange={(e) => setSelectedAnime({ ...selectedAnime, releaseDate: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="font-medium">Yüklenme Tarihi:</span>
                      <Input
                        className="col-span-3"
                        type="date"
                        value={selectedAnime.uploadDate}
                        onChange={(e) => setSelectedAnime({ ...selectedAnime, uploadDate: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="font-medium">Yükleyen Kullanıcı:</span>
                      <Input
                        className="col-span-3"
                        value={selectedAnime.uploadUser}
                        onChange={(e) => setSelectedAnime({ ...selectedAnime, uploadUser: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="font-medium">Durum:</span>
                      <Select
                        value={selectedAnime.status}
                        onValueChange={(value) => setSelectedAnime({ ...selectedAnime, status: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Durum seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yayında">Yayında</SelectItem>
                          <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                          <SelectItem value="Yakında">Yakında</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit">Değişiklikleri Kaydet</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

