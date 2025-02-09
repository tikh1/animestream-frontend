'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from 'date-fns'
import { ThumbsUp, ThumbsDown, MessageSquare, AlertTriangle, Send, ChevronDown, ChevronUp } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion, AnimatePresence } from 'framer-motion'

interface CommentsProps {
  animeId: string
}

interface Comment {
  id: string
  user: {
    name: string
    avatar?: string
  }
  content: string
  createdAt: Date
  likes: number
  dislikes: number
  replies?: Comment[]
  isSpoiler?: boolean
}

export default function Comments({ animeId }: CommentsProps) {
  const [newComment, setNewComment] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [isSpoiler, setIsSpoiler] = useState(false)
  const [revealedSpoilers, setRevealedSpoilers] = useState<string[]>([])
  const [expandedComments, setExpandedComments] = useState<string[]>([])

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: {
        name: 'John Doe',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      content: 'This anime is absolutely amazing! The animation quality and storytelling are top-notch.',
      createdAt: new Date('2024-01-03T12:00:00'),
      likes: 15,
      dislikes: 2,
      replies: [
        {
          id: '1-1',
          user: {
            name: 'Alice Smith',
            avatar: '/placeholder.svg?height=40&width=40',
          },
          content: 'I totally agree! The character development is incredible too.',
          createdAt: new Date('2024-01-03T14:30:00'),
          likes: 5,
          dislikes: 0,
        }
      ]
    },
    {
      id: '2',
      user: {
        name: 'Jane Smith',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      content: 'The main character dies in the final episode! I can\'t believe they did that!',
      createdAt: new Date('2024-01-02T15:30:00'),
      likes: 10,
      dislikes: 1,
      isSpoiler: true,
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    const newCommentObj: Comment = {
      id: String(comments.length + 1),
      user: {
        name: 'Current User',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      content: newComment,
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
      isSpoiler: isSpoiler,
    }
    setComments([newCommentObj, ...comments])
    setNewComment('')
    setIsSpoiler(false)
  }

  const toggleSpoiler = (commentId: string) => {
    setRevealedSpoilers(prev => 
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    )
  }

  const toggleExpand = (commentId: string) => {
    setExpandedComments(prev => 
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    )
  }

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'newest') return b.createdAt.getTime() - a.createdAt.getTime()
    if (sortBy === 'oldest') return a.createdAt.getTime() - b.createdAt.getTime()
    if (sortBy === 'mostLiked') return b.likes - a.likes
    return 0
  })

  const CommentComponent = ({ comment, depth = 0 }: { comment: Comment, depth?: number }) => {
    const isExpanded = expandedComments.includes(comment.id)
    const hasReplies = comment.replies && comment.replies.length > 0

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`${depth > 0 ? 'ml-12 mt-3' : 'mt-4'}`}
      >
        <div className="flex gap-3">
          <Avatar className="w-8 h-8 mt-0.5">
            <AvatarImage src={comment.user.avatar} />
            <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">{comment.user.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
              {comment.isSpoiler && (
                <span className="text-xs bg-red-500/20 text-red-400 dark:text-red-300 px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors">
                  <AlertTriangle className="w-3 h-3" />
                  Spoiler
                </span>
              )}
            </div>
            {comment.isSpoiler && !revealedSpoilers.includes(comment.id) ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 bg-card/50 backdrop-blur-sm border border-border/50 p-4 rounded-lg"
              >
                <p className="text-muted-foreground text-sm mb-3">
                  This comment contains spoilers. Are you sure you want to view it?
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSpoiler(comment.id)}
                  className="group relative overflow-hidden transition-colors hover:text-accent-foreground"
                >
                  <span className="relative z-10">Reveal Spoiler</span>
                  <motion.div
                    className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    transition={{ duration: 0.2 }}
                  />
                </Button>
              </motion.div>
            ) : (
              <motion.p 
                className="text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {comment.content}
              </motion.p>
            )}
            <div className="flex items-center gap-4 mt-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-auto py-0 px-1">
                <ThumbsUp className="w-4 h-4 mr-1.5" />
                {comment.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-auto py-0 px-1">
                <ThumbsDown className="w-4 h-4 mr-1.5" />
                {comment.dislikes}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-auto py-0 px-1">
                Reply
              </Button>
            </div>
          </div>
        </div>
        {hasReplies && (
          <div className="mt-1 ml-11">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpand(comment.id)}
              className="text-xs text-muted-foreground hover:text-foreground h-auto py-0 px-1"
            >
              {isExpanded ? (
                <>
                  Hide Replies
                  <ChevronUp className="w-3 h-3 ml-1" />
                </>
              ) : (
                <>
                  Show Replies ({comment.replies?.length})
                  <ChevronDown className="w-3 h-3 ml-1" />
                </>
              )}
            </Button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {comment.replies?.map((reply) => (
                    <CommentComponent key={reply.id} comment={reply} depth={depth + 1} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Comments</h2>
          <Select onValueChange={setSortBy} defaultValue={sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="mostLiked">Most Liked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Comment Form */}
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="spoilerToggle"
                  checked={isSpoiler}
                  onChange={(e) => setIsSpoiler(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="spoilerToggle" className="text-sm text-muted-foreground">
                  Mark as spoiler
                </label>
              </div>
              <Button type="submit" disabled={!newComment.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div>
          <AnimatePresence>
            {sortedComments.map((comment) => (
              <CommentComponent key={comment.id} comment={comment} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

