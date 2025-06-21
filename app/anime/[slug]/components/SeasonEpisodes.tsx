"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Clock, CheckCircle2, Plus, ImageIcon, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Season } from "@/services/anime/anime_detail"

interface SeasonEpisodesProps {
  animeId: string
  seasons: Season[]
}

export default function SeasonEpisodes({ animeId, seasons: apiSeasons }: SeasonEpisodesProps) {
  const [activeSeason, setActiveSeason] = useState("1")
  const [isAddSeasonDialogOpen, setIsAddSeasonDialogOpen] = useState(false)
  const [newSeasonData, setNewSeasonData] = useState({
    title: "",
    episodeCount: "",
    year: "",
    image: null as File | null,
  })

  console.log('API Seasons:', apiSeasons)

  const handleAddSeason = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically make an API call to add the new season
    console.log("Adding new season:", {
      ...newSeasonData,
      image: newSeasonData.image ? newSeasonData.image.name : "No image uploaded",
    })
    setIsAddSeasonDialogOpen(false)
    setNewSeasonData({ title: "", episodeCount: "", year: "", image: null })
  }

  // API'den gelen sezonları kullan, yoksa boş array
  const seasons = apiSeasons && apiSeasons.length > 0 ? apiSeasons.map((season, seasonIndex) => ({
    id: String(season.id),
    season_id: seasonIndex + 1,
    title: season.name,
    episodeCount: season.episodes.length,
    year: new Date().getFullYear().toString(), // API'den gelmiyorsa şu anki yıl
    episodes: season.episodes.map((episode, episodeIndex) => ({
      id: episodeIndex + 1,
      episode_slug: episode.slug,
      title: episode.name,
      thumbnail: "/placeholder.svg?height=180&width=320&text=EP" + episode.id.toString().padStart(2, "0"),
      duration: episode.duration,
      progress: 0,
    }))
  })) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Season Tabs */}
        <div className="flex flex-wrap gap-2">
          {seasons.map((season) => (
            <button
              key={season.id}
              onClick={() => setActiveSeason(season.id)}
              className={cn(
                "relative px-6 py-3 rounded-lg transition-all duration-200",
                "text-sm font-medium",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                activeSeason === season.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card hover:bg-accent text-muted-foreground hover:text-foreground",
              )}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-semibold">{season.title}</span>
                <span className="text-xs opacity-80">
                  {season.episodeCount} Episodes • {season.year}
                </span>
              </div>
              {activeSeason === season.id && (
                <div className="absolute -bottom-px left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-primary rotate-45 transform origin-center" />
                </div>
              )}
            </button>
          ))}
          <button
            onClick={() => setIsAddSeasonDialogOpen(true)}
            className={cn(
              "relative px-6 py-3 rounded-lg transition-all duration-200",
              "text-sm font-medium",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              "bg-primary text-primary-foreground shadow-lg",
            )}
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Add Season</span>
            </div>
          </button>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {seasons
            .find((s) => s.id === activeSeason)
            ?.episodes.map((episode) => (
              <Link
                key={episode.episode_slug}
                href={`/anime/${animeId}/episode/${episode.episode_slug}`}
                className="group relative bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video">
                  <img
                    src={episode.thumbnail || "/placeholder.svg"}
                    alt={`Episode ${episode.episode_slug}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay for dimming */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-12 h-12 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  {episode.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                      <div className="h-full bg-primary transition-all" style={{ width: `${episode.progress}%` }} />
                    </div>
                  )}

                  {/* Episode Number Badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded-none text-xs font-medium text-white">
                    EP {seasons.find((s) => s.id === activeSeason)?.season_id} : {episode.id}
                  </div>

                  {/* Watched Badge */}
                  {episode.progress === 100 && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="relative p-4">
                  {/* Episode Info */}
                  <div className="space-y-2">
                    <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                      {episode.title}
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {episode.duration}
                    </div>
                  </div>

                  {/* Watch/Continue Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-card/95 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-[calc(100%-2rem)]" size="sm" variant="secondary">
                      {episode.progress > 0 ? (
                        <>
                          Continue
                          <span className="ml-1 text-xs opacity-70">{episode.progress}%</span>
                        </>
                      ) : (
                        "Watch"
                      )}
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Dialog open={isAddSeasonDialogOpen} onOpenChange={setIsAddSeasonDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Season</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSeason}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newSeasonData.title}
                  onChange={(e) => setNewSeasonData({ ...newSeasonData, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="episodeCount" className="text-right">
                  Episodes
                </Label>
                <Input
                  id="episodeCount"
                  type="number"
                  value={newSeasonData.episodeCount}
                  onChange={(e) => setNewSeasonData({ ...newSeasonData, episodeCount: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Input
                  id="year"
                  type="number"
                  value={newSeasonData.year}
                  onChange={(e) => setNewSeasonData({ ...newSeasonData, year: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="image" className="text-right pt-4">
                  Poster Image
                </Label>
                <Card className="col-span-3 border-2 border-dashed">
                  <CardContent className="pt-4 px-4 pb-4">
                    <div className="flex flex-col items-center justify-center min-h-[150px] text-center">
                      {newSeasonData.image ? (
                        <div className="space-y-2">
                          <div className="relative w-full aspect-[3/4] max-w-[200px]">
                            <img
                              src={URL.createObjectURL(newSeasonData.image) || "/placeholder.svg"}
                              alt="Season poster preview"
                              className="rounded-lg object-cover w-full h-full"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setNewSeasonData({ ...newSeasonData, image: null })}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-12 h-12 mb-4 text-muted-foreground" />
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewSeasonData({ ...newSeasonData, image: e.target.files?.[0] || null })}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("image")?.click()}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Choose Image
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Season</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

