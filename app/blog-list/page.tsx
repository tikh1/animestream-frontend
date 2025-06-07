'use client'

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { BlogCard } from './components/BlogCard'
import { Pagination } from "@/components/ui/pagination"
import fetchBlogList from "@/services/blog/blog_list"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Blog {
  id: number
  meta_title: string
  meta_description: string
  title: string
  description: string
  slug: string
  thumbnail: string
  category: string
  publishDate: string
  author: string
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 6

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const blogs = await fetchBlogList()
      setBlogs(blogs)
      setFilteredBlogs(blogs)
      console.log("Blog verileri başarıyla alındı:", blogs)
    } catch (error) {
      console.error("Blog verileri alınamadı:", error)
      setBlogs([])
      setFilteredBlogs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    let result = [...blogs]

    if (searchTerm) {
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.meta_description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    result.sort((a, b) => {
      if (sortBy === "date") return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      if (sortBy === "title") return a.title.localeCompare(b.title)
      return 0
    })

    setFilteredBlogs(result)
    setCurrentPage(1)
  }, [searchTerm, sortBy, blogs])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem)

  if (loading) return <p className="text-center text-xl">Yükleniyor...</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Yazıları</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Blog yazısı ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/2"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Sıralama" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Tarih</SelectItem>
            <SelectItem value="title">Başlık</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filteredBlogs.length === 0 ? (
        <p className="text-center text-xl">Blog yazısı bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentItems.map((blog) => (
            <BlogCard key={blog.id} post={blog} />
          ))}
        </div>
      )}
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalCount={filteredBlogs.length}
          pageSize={itemsPerPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
