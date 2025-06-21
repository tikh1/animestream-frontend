'use client'

import { notFound } from "next/navigation"
import EpisodePlayer from "../components/EpisodePlayer"
import EpisodeInfo from "../components/EpisodeInfo"
import EpisodeComments from "../components/EpisodeComments"
import RelatedEpisodes from "../components/RelatedEpisodes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Loader2 } from "lucide-react"
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
import { fetchEpisode, fetchAnimeWithEpisodes, Episode, AnimeData } from "@/services/anime/episode"

interface EpisodeWatchPageProps {
  params: {
    slug: string
    episodeId: string
  }
}

export default function EpisodeWatchPage({ params }: EpisodeWatchPageProps) {
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [anime, setAnime] = useState<AnimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
  })

  useEffect(() => {
    const loadEpisodeData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch both episode and anime data
        const [episodeData, animeData] = await Promise.all([
          fetchEpisode(params.slug, params.episodeId),
          fetchAnimeWithEpisodes(params.slug)
        ])

        if (!episodeData) {
          setError("Episode not found")
          return
        }

        setEpisode(episodeData)
        setAnime(animeData)
        setEditFormData({
          title: episodeData.name,
          description: episodeData.summary,
        })
      } catch (err) {
        console.error("Error loading episode:", err)
        setError("Failed to load episode")
      } finally {
        setLoading(false)
      }
    }

    loadEpisodeData()
  }, [params.slug, params.episodeId])

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Updated episode data:", editFormData)
    // Here you would typically make an API call to update the episode data
    setIsEditDialogOpen(false)
  }

  const handleDelete = () => {
    console.log("Deleting episode:", params.episodeId)
    // Here you would typically make an API call to delete the episode
    setIsDeleteConfirmOpen(false)
    // Redirect to anime page or episode list after successful deletion
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading episode...</span>
        </div>
      </div>
    )
  }

  if (error || !episode || !anime) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Episode {episode.id}: {episode.name}
            </h1>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setIsDeleteConfirmOpen(true)}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setIsEditDialogOpen(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <EpisodePlayer 
            videoUrl={episode.video_url || ""} 
            thumbnail={episode.thumbnail || anime.thumbnail} 
          />
          <EpisodeInfo 
            episode={{
              title: episode.name,
              number: episode.id,
              season: episode.season_id,
              description: episode.summary
            }} 
            animeId={params.slug} 
          />
          <EpisodeComments episodeId={params.episodeId} animeId={String(anime.id)} />
        </div>
        <aside>
          <RelatedEpisodes currentEpisodeId={params.episodeId} animeId={params.slug} />
        </aside>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Episode Details</DialogTitle>
            <DialogDescription>
              Make changes to the episode information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this episode? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

