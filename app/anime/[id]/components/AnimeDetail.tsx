import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Star, Pencil, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MultiSelect } from "@/components/ui/multi-select"
import { DatePicker } from "@/components/ui/date-picker"
import { format } from "date-fns"

interface AnimeDetailProps {
  anime: {
    title: string
    image: string
    releaseDate: string
    duration: string
    genres: string[]
    description: string
    imdbRating: number
  }
}

const isAdminOrMod = () => true // Replace with actual authentication logic

export default function AnimeDetail({ anime }: AnimeDetailProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: anime.title,
    image: anime.image,
    releaseDate: new Date(anime.releaseDate),
    duration: anime.duration,
    genres: anime.genres,
    description: anime.description,
    imdbRating: anime.imdbRating,
  })

  const genreOptions = [
    { label: "Action", value: "Action" },
    { label: "Drama", value: "Drama" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "Mystery", value: "Mystery" },
    // Add more genres as needed
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // API call to update anime details
    console.log("Updated Anime Data:", formData)
    setOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-4">
          <img
            src={anime.image || "/placeholder.svg"}
            alt={anime.title}
            className="w-full rounded-lg object-cover aspect-[3/4] bg-muted"
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{anime.title}</h1>
              {isAdminOrMod() && (
                <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                {anime.releaseDate}
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {anime.duration}
              </div>
              <div className="flex items-center">
                <Star className="mr-2 h-4 w-4 fill-yellow-400" />
                <span className="font-medium text-yellow-400">{anime.imdbRating}</span>
                <span className="ml-1">IMDb</span>
              </div>
            </div>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Anime Bilgilerini Düzenle</DialogTitle>
                <DialogDescription>Anime ile ilgili bilgileri aşağıdan düzenleyebilirsiniz.</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Başlık</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Resim URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Yayın Tarihi</Label>
                    <DatePicker
                      value={formData.releaseDate}
                      onChange={(date) => setFormData({ ...formData, releaseDate: date })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Süre</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imdbRating">IMDb Puanı</Label>
                    <Input
                      id="imdbRating"
                      type="number"
                      value={formData.imdbRating}
                      onChange={(e) => setFormData({ ...formData, imdbRating: Number.parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genres">Türler</Label>
                    <MultiSelect
                      options={genreOptions}
                      selected={formData.genres}
                      onChange={(genres) => setFormData({ ...formData, genres })}
                      placeholder="Türleri seçin"
                    />
                  </div>
                  <div className="space-y-2 col-span-1 lg:col-span-2">
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="min-h-[200px]"
                    />
                  </div>
                </form>
                <DialogFooter className="px-6 pb-6">
                  <Button type="submit">Kaydet</Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex flex-wrap gap-2">
            {anime.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">{anime.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

