import { Metadata } from "next"
import { notFound } from "next/navigation"
import EpisodePlayer from "../components/EpisodePlayer"
import EpisodeInfo from "../components/EpisodeInfo"
import EpisodeComments from "../components/EpisodeComments"
import RelatedEpisodes from "../components/RelatedEpisodes"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
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

// This would typically come from an API or database
const episodeDatabase = {
  "attack-on-titan": {
    "1": {
      title: "To You, 2,000 Years Later",
      number: 1,
      season: 1,
      description:
        "After 100 years of peace, humanity is suddenly reminded of the terror of being at the Titans' mercy.",
      thumbnail: "/placeholder.svg?height=720&width=1280&text=Episode+1+Thumbnail",
      videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Example MP4 video
    },
    // Add more episodes...
  },
  // Add more anime...
}

// ... rest of the code remains the same

export default function EpisodeWatchPage({ params }: EpisodeWatchPageProps) {
  const anime = episodeDatabase[params.id]
  const episode = anime?.[params.episodeId]

  if (!episode) {
    notFound()
  }

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({
    title: episode.title,
    description: episode.description,
  })

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Episode {episode.number}: {episode.title}
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
          <EpisodePlayer videoUrl={episode.videoUrl} thumbnail={episode.thumbnail} />
          <EpisodeInfo episode={episode} animeId={params.id} />
          <EpisodeComments episodeId={params.episodeId} animeId={params.id} />
        </div>
        <aside>
          <RelatedEpisodes currentEpisodeId={params.episodeId} animeId={params.id} />
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

