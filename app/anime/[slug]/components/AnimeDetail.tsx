"use client";

import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Star, Pencil, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
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
import { fetchAnimeDetail, AnimeData, Genre } from "@/services/anime/anime_detail";

const isAdminOrMod = () => true // Replace with actual authentication logic

interface AnimeDetailparams {
  params: {
    slug: string;
  };
}

interface FormData {
  title: string;
  image: string;
  releaseDate: Date;
  duration: string;
  genres: Genre[];
  description: string;
  imdbRating: number;
}

export default function AnimeDetail({ params }: AnimeDetailparams) {
  const { slug } = params;
  const [anime, setAnime] = useState<AnimeData>({} as AnimeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    image: "",
    releaseDate: new Date(),
    duration: "",
    genres: [],
    description: "",
    imdbRating: 0,
  })

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await fetchAnimeDetail(slug);
        setAnime(data);
        // Update formData with anime data when it's loaded
        setFormData({
          title: data.name || "",
          image: data.thumbnail || "",
          releaseDate: new Date(data.release_date || new Date()),
          duration: "", // TODO: Add duration field to anime data
          genres: data.genres || [],
          description: data.summary || "",
          imdbRating: data.imdb_score || 0,
        });
      } catch (err) {
        setError("Anime bilgileri alınamadı.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [slug]);


  const genreOptions = [
    { label: "Action", value: "Action" },
    { label: "Drama", value: "Drama" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "Mystery", value: "Mystery" },
    // Add more genres as needed
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // API call to update anime details
    console.log("Updated Anime Data:", formData)
    setOpen(false)
  }

  if (loading) return <p className="text-center">Yükleniyor...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!anime) return <p className="text-center text-red-500">Anime bulunamadı.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-4">
          <img
            src={anime.thumbnail || "/placeholder.svg"}
            alt={anime.name}
            className="w-full rounded-lg object-cover aspect-[3/4] bg-muted"
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{anime.name}</h1>
              {isAdminOrMod() && (
                <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                {anime.release_date}
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {
                  // ████████  ██████  ██████   ██████  
                  //    ██    ██    ██ ██   ██ ██    ██ 
                  //    ██    ██    ██ ██   ██ ██    ██ 
                  //    ██    ██    ██ ██   ██ ██    ██ 
                  //    ██     ██████  ██████   ██████  
                  /**TODO
                    * ! duration değeri değiştirilecek
                  */
                }
                {/* {anime?.duration} */}
              </div>
              <div className="flex items-center">
                <Star className="mr-2 h-4 w-4 fill-yellow-400" />
                <span className="font-medium text-yellow-400">{anime.imdb_score}</span>
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
                    <DatePicker />
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
                      defaultValue={formData.genres.map(genre => genre.name)}
                      onValueChange={(selectedGenres) => {
                        const genreObjects = selectedGenres.map(name => ({
                          name,
                          pivot: { anime_id: 0, genre_id: 0 }
                        }));
                        setFormData({ ...formData, genres: genreObjects });
                      }}
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
            {anime.genres.map((genre: Genre) => (
              <Badge key={genre.name} variant="secondary">
                {genre.name}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">{anime.summary}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

