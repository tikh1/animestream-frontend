'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const reviews = [
  { id: 1, user: "Alice", avatar: "/placeholder.svg?height=40&width=40&text=A", anime: "Attack on Titan", rating: 5, comment: "Absolutely mind-blowing! The plot twists keep you on the edge of your seat." },
  { id: 2, user: "Bob", avatar: "/placeholder.svg?height=40&width=40&text=B", anime: "My Hero Academia", rating: 4, comment: "Great character development and exciting action scenes." },
  { id: 3, user: "Charlie", avatar: "/placeholder.svg?height=40&width=40&text=C", anime: "Demon Slayer", rating: 5, comment: "Beautiful animation and a captivating story. Can't wait for more!" },
  { id: 4, user: "Diana", avatar: "/placeholder.svg?height=40&width=40&text=D", anime: "One Punch Man", rating: 4, comment: "Hilarious and action-packed. A refreshing take on the superhero genre." },
]

export default function UserReviews() {
  const [currentReview, setCurrentReview] = useState(0)

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
        <div className="max-w-3xl mx-auto">
          <motion.div
            key={currentReview}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-secondary/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={reviews[currentReview].avatar} alt={reviews[currentReview].user} />
                    <AvatarFallback>{reviews[currentReview].user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{reviews[currentReview].user}</h3>
                    <p className="text-sm text-muted-foreground">{reviews[currentReview].anime}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(reviews[currentReview].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-lg italic">{reviews[currentReview].comment}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="text-center mt-6">
          <button 
            onClick={nextReview}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Next Review
          </button>
        </div>
      </div>
    </section>
  )
}

