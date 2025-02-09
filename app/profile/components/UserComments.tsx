"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { tr } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ThumbsUp, ThumbsDown, MessageSquare, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Comment {
  id: string
  animeTitle: string
  episodeTitle?: string
  comment: string
  createdAt: string
  likes: number
  dislikes: number
  userAvatar?: string
  userName: string
  episodeNumber?: number
  seasonNumber?: number
}

const mockComments: Comment[] = [
  {
    id: "1",
    animeTitle: "Attack on Titan",
    episodeTitle: "To You, 2000 Years From Now",
    episodeNumber: 1,
    seasonNumber: 1,
    comment:
      "Harika bir başlangıç bölümüydü! Animenin atmosferi ve çizim kalitesi gerçekten etkileyici. Eren'in karakterinin nasıl gelişeceğini merak ediyorum.",
    createdAt: "2024-03-15T12:00:00Z",
    likes: 24,
    dislikes: 2,
    userName: "AnimeUser123",
    userAvatar: "/placeholder.svg?height=40&width=40&text=AU",
  },
  {
    id: "2",
    animeTitle: "My Hero Academia",
    episodeTitle: "Izuku Midoriya: Origin",
    episodeNumber: 1,
    seasonNumber: 1,
    comment:
      "Deku'nun kahramanlık yolculuğunun başlangıcı muhteşem anlatılmış. All Might ile olan sahneler özellikle etkileyiciydi.",
    createdAt: "2024-03-10T15:30:00Z",
    likes: 18,
    dislikes: 1,
    userName: "AnimeUser123",
    userAvatar: "/placeholder.svg?height=40&width=40&text=AU",
  },
  {
    id: "3",
    animeTitle: "Demon Slayer",
    episodeTitle: "Cruelty",
    episodeNumber: 1,
    seasonNumber: 1,
    comment:
      "Ufotable'ın animasyon kalitesi her zamanki gibi müthiş. Tanjiro'nun ailesinin trajik hikayesi çok iyi işlenmiş.",
    createdAt: "2024-03-05T09:15:00Z",
    likes: 32,
    dislikes: 3,
    userName: "AnimeUser123",
    userAvatar: "/placeholder.svg?height=40&width=40&text=AU",
  },
]

export function UserComments() {
  const [comments, setComments] = useState<Comment[]>(mockComments)

  const handleDelete = (commentId: string) => {
    setComments(comments.filter((comment) => comment.id !== commentId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Yorumlarım</h3>
        <Badge variant="secondary" className="text-sm">
          {comments.length} yorum
        </Badge>
      </div>

      <AnimatePresence mode="popLayout">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="group hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src={comment.userAvatar} />
                      <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{comment.animeTitle}</CardTitle>
                      <CardDescription>
                        Season {comment.seasonNumber}, Episode {comment.episodeNumber} - {comment.episodeTitle}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(comment.id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{comment.comment}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {comment.dislikes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Yanıtla
                    </Button>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: tr,
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {comments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p>Henüz yorum yapmamışsınız</p>
        </motion.div>
      )}
    </div>
  )
}

