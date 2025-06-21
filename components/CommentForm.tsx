'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from 'lucide-react'

interface CommentFormProps {
  onSubmit: (comment: string, isSpoiler: boolean) => Promise<void>
  loading?: boolean
  placeholder?: string
  buttonText?: string
}

export default function CommentForm({ 
  onSubmit, 
  loading = false, 
  placeholder = "Share your thoughts...",
  buttonText = "Post Comment"
}: CommentFormProps) {
  const [newComment, setNewComment] = useState('')
  const [isSpoiler, setIsSpoiler] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    
    try {
      await onSubmit(newComment, isSpoiler)
      setNewComment('')
      setIsSpoiler(false)
    } catch (error) {
      console.error('Error in comment form:', error)
    }
  }

  return (
    <div className="bg-card p-4 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder={placeholder}
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
          <Button type="submit" disabled={!newComment.trim() || loading}>
            <Send className="w-4 h-4 mr-2" />
            {loading ? 'Posting...' : buttonText}
          </Button>
        </div>
      </form>
    </div>
  )
} 