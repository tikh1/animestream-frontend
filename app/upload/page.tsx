'use client'

import { useState } from 'react'
import { format } from "date-fns"
import { CalendarIcon, Upload, X, Film, ImageIcon, Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { MultiSelect } from "@/components/ui/multi-select"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UploadPage() {
  const animeList = [
    { value: 'attack-on-titan', label: 'Attack on Titan' },
    { value: 'my-hero-academia', label: 'My Hero Academia' },
    { value: 'demon-slayer', label: 'Demon Slayer' },
    { value: 'one-piece', label: 'One Piece' },
    { value: 'naruto', label: 'Naruto' },
  ]

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [genres, setGenres] = useState<string[]>([])
  const [releaseDate, setReleaseDate] = useState<Date>(new Date())
  const [episodeNumber, setEpisodeNumber] = useState('1')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [seasonNumber, setSeasonNumber] = useState('')
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [selectedAnime, setSelectedAnime] = useState(animeList.length > 0 ? animeList[0].value : '')
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ 
      anime: selectedAnime,
      title, 
      description, 
      genres, 
      releaseDate: releaseDate ? format(releaseDate, "yyyy-MM-dd") : '', 
      seasonNumber, 
      episodeNumber, 
      videoFile, 
      thumbnailFile 
    })
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setThumbnailFile(null)
      setThumbnailPreview(null)
    }
  }

  const genreOptions = [
    { label: 'Aksiyon', value: 'action' },
    { label: 'Macera', value: 'adventure' },
    { label: 'Komedi', value: 'comedy' },
    { label: 'Dram', value: 'drama' },
    { label: 'Fantezi', value: 'fantasy' },
    { label: 'Bilim Kurgu', value: 'sci-fi' },
    { label: 'Romantik', value: 'romance' },
  ]

  return (
    <>
      <div className="container max-w-5xl mx-auto px-2 py-4">
        <Card className="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75 border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Yeni Anime Bölümü Yükle</CardTitle>
            <CardDescription>Lütfen anime bölümü detaylarını ve video dosyasını yükleyin.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
    <div className="space-y-2 md:col-span-3">
      <Label htmlFor="anime">Anime Seçin</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedAnime
              ? animeList.find((anime) => anime.value === selectedAnime)?.label || "Anime seçilmedi"
              : "Bir anime seçin..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Anime ara..." />
            <CommandEmpty>Anime bulunamadı.</CommandEmpty>
            <CommandGroup>
              {animeList && animeList.length > 0 ? (
                animeList.map((anime) => (
                  <CommandItem
                    key={anime.value}
                    onSelect={(currentValue) => {
                      setSelectedAnime(currentValue === selectedAnime ? "" : anime.value)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedAnime === anime.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {anime.label}
                  </CommandItem>
                ))
              ) : (
                <CommandItem>Anime listesi boş</CommandItem>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
    <div className="space-y-2 md:col-span-1">
      <Label>Yayın Tarihi</Label>
      <DatePicker 
        startYear={1900}
        endYear={new Date().getFullYear()}
        onChange={setReleaseDate}
        value={releaseDate}
      />
    </div>
    <div className="space-y-2 md:col-span-1">
     <Label htmlFor="seasonNumber">Sezon Numarası</Label>
     <Select value={seasonNumber} onValueChange={setSeasonNumber}>
       <SelectTrigger id="seasonNumber">
         <SelectValue placeholder="Sezon seçin" />
       </SelectTrigger>
       <SelectContent>
         {[...Array(20)].map((_, i) => (
           <SelectItem key={i} value={(i + 1).toString()}>
             Season {i + 1}
           </SelectItem>
         ))}
       </SelectContent>
     </Select>
    </div>
    <div className="space-y-2 md:col-span-1">
      <Label htmlFor="episodeNumber">Bölüm Numarası</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {episodeNumber ? `Bölüm ${episodeNumber}` : "Bölüm seçin..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Bölüm ara..." />
            <CommandEmpty>Bölüm bulunamadı.</CommandEmpty>
            <CommandGroup>
              {[...Array(24)].map((_, i) => (
                <CommandItem
                  key={i}
                  value={(i + 1).toString()}
                  onSelect={(currentValue) => {
                    setEpisodeNumber(currentValue === episodeNumber ? "" : (i + 1).toString())
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      episodeNumber === (i + 1).toString() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  Bölüm {i + 1}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="title">Bölüm Başlığı</Label>
      <Input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="bg-background/50"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="description">Bölüm Açıklaması (Spoiler İçermemeli!)</Label>
      <Textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="bg-background/50 min-h-[100px]"
      />
    </div>
  </div>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <Card className="border-2 border-dashed">
      <CardContent className="pt-4 px-4 pb-4">
        <div className="flex flex-col items-center justify-center min-h-[150px] text-center">
          {videoFile ? (
            <div className="space-y-2">
              <Film className="w-12 h-12 mx-auto text-primary" />
              <p className="text-sm font-medium">{videoFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setVideoFile(null)}
              >
                <X className="w-4 h-4 mr-2" />
                Kaldır
              </Button>
            </div>
          ) : (
            <>
              <Film className="w-12 h-12 mb-4 text-muted-foreground" />
              <Input
                id="video"
                type="file"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                accept="video/*"
                required
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('video')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Video Seç
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>

    <Card className="border-2 border-dashed">
      <CardContent className="pt-4 px-4 pb-4">
        <div className="flex flex-col items-center justify-center min-h-[150px] text-center">
          {thumbnailPreview ? (
            <div className="space-y-2">
              <div className="relative w-full aspect-video">
                <img
                  src={thumbnailPreview || "/placeholder.svg"}
                  alt="Thumbnail preview"
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setThumbnailFile(null)
                  setThumbnailPreview(null)
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Kaldır
              </Button>
            </div>
          ) : (
            <>
              <ImageIcon className="w-12 h-12 mb-4 text-muted-foreground" />
              <Input
                id="thumbnail"
                type="file"
                onChange={handleThumbnailChange}
                accept="image/*"
                required
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('thumbnail')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Resim Seç
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
  <Button type="submit" className="w-full">Yükle</Button>
</form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

