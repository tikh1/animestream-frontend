'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BlogCard } from './components/BlogCard'
import { Pagination } from "@/components/ui/pagination"

// Genişletilmiş blog verileri
const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Most Anticipated Anime of 2024',
    excerpt: 'From long-awaited sequels to exciting new adaptations, here are the most anticipated anime coming in 2024.',
    image: '/placeholder.svg?height=400&width=600&text=Upcoming+Anime+2024',
    date: '2024-01-05',
    category: 'News',
    author: 'Anime Expert'
  },
  {
    id: 2,
    title: 'The Evolution of Anime Animation: From Cel to Digital',
    excerpt: 'A deep dive into how anime animation techniques have evolved over the decades.',
    image: '/placeholder.svg?height=400&width=600&text=Anime+Evolution',
    date: '2024-01-03',
    category: 'Analysis',
    author: 'Animation Historian'
  },
  {
    id: 3,
    title: 'How Manga Influences Modern Anime Adaptations',
    excerpt: 'Exploring the relationship between manga source materials and their anime adaptations.',
    image: '/placeholder.svg?height=400&width=600&text=Manga+Impact',
    date: '2024-01-01',
    category: 'Feature',
    author: 'Manga Enthusiast'
  },
  {
    id: 4,
    title: 'The Rise of Isekai: Analyzing the Popular Anime Genre',
    excerpt: 'Examining the surge in popularity of isekai anime and its impact on the industry.',
    image: '/placeholder.svg?height=400&width=600&text=Isekai+Trend',
    date: '2023-12-28',
    category: 'Analysis',
    author: 'Genre Specialist'
  },
  {
    id: 5,
    title: 'Voice Acting in Anime: Behind the Scenes',
    excerpt: 'An inside look at the world of voice acting in the anime industry.',
    image: '/placeholder.svg?height=400&width=600&text=Voice+Acting',
    date: '2023-12-25',
    category: 'Feature',
    author: 'Industry Insider'
  },
  {
    id: 6,
    title: 'Anime Soundtracks: The Unsung Heroes of Storytelling',
    excerpt: 'Exploring how music enhances the narrative and emotional impact of anime.',
    image: '/placeholder.svg?height=400&width=600&text=Anime+Soundtracks',
    date: '2023-12-22',
    category: 'Analysis',
    author: 'Music Critic'
  },
  {
    id: 7,
    title: 'The Global Impact of Anime: Cultural Exchange Through Animation',
    excerpt: 'How anime has influenced and been influenced by cultures around the world.',
    image: '/placeholder.svg?height=400&width=600&text=Global+Anime',
    date: '2023-12-19',
    category: 'Feature',
    author: 'Cultural Anthropologist'
  },
  {
    id: 8,
    title: 'Anime Conventions: A Guide for First-Time Attendees',
    excerpt: 'Everything you need to know before attending your first anime convention.',
    image: '/placeholder.svg?height=400&width=600&text=Anime+Conventions',
    date: '2023-12-16',
    category: 'Guide',
    author: 'Convention Veteran'
  },
  {
    id: 9,
    title: 'The Art of Anime: From Concept to Screen',
    excerpt: 'A step-by-step look at the process of creating an anime, from initial concept to final product.',
    image: '/placeholder.svg?height=400&width=600&text=Anime+Creation',
    date: '2023-12-13',
    category: 'Feature',
    author: 'Animation Director'
  },
  {
    id: 10,
    title: 'Anime and Mental Health: Representation and Impact',
    excerpt: 'Analyzing how mental health issues are portrayed in anime and the effect on viewers.',
    image: '/placeholder.svg?height=400&width=600&text=Anime+Mental+Health',
    date: '2023-12-10',
    category: 'Analysis',
    author: 'Psychologist & Anime Researcher'
  }
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Anime Blog</h1>
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Blog yazılarında ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalCount={filteredPosts.length}
          pageSize={postsPerPage}
          onChange={paginate}
        />
      </div>
    </div>
  )
}

