"use client"
import { notFound } from "next/navigation"
import { CalendarDays, ArrowLeft, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import Link from "next/link"
import { useState, useEffect } from "react"

interface BlogPost {
  id: string
  title: string
  content: string
  image: string
  date: string
  category: string
  excerpt: string
  author: string
}

// Simulate fetching blog posts from an API
const fetchBlogPost = async (id: string): Promise<BlogPost | null> => {
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Top 10 Most Anticipated Anime of 2024",
      content: `
        <p>The anime industry continues to thrive, and 2024 promises to be another exciting year for fans worldwide. From highly anticipated sequels to brand new adaptations, here's our list of the most promising anime coming in 2024.</p>

        <h2>1. Solo Leveling</h2>
        <p>Based on the incredibly popular Korean web novel and manhwa, Solo Leveling is perhaps the most anticipated anime of 2024. A-1 Pictures is handling the animation, and expectations are sky-high for this action-packed series.</p>

        <h2>2. Kaiju No. 8</h2>
        <p>Another highly anticipated adaptation, Kaiju No. 8 brings a fresh take on the kaiju genre. With Production I.G at the helm, fans can expect high-quality animation and intense action sequences.</p>

        <h2>3. Demon Slayer Season 4</h2>
        <p>Ufotable returns with another season of the phenomenally successful Demon Slayer. The Hashira Training Arc promises to be one of the most exciting chapters in the series.</p>
      `,
      image: "/placeholder.svg?height=600&width=1200&text=Upcoming+Anime+2024",
      date: "2024-01-05",
      category: "News",
      excerpt:
        "From long-awaited sequels to exciting new adaptations, here are the most anticipated anime coming in 2024.",
      author: "Anime Expert",
    },
    {
      id: "örnek-blog-yazısı",
      title: "Örnek Blog Yazısı",
      content: "<p>Bu bir örnek blog yazısıdır.</p>",
      image: "/placeholder.svg?height=600&width=1200&text=Örnek+Blog+Yazısı",
      date: "2025-02-01",
      category: "Örnek",
      excerpt: "Bu bir örnek blog yazısının özetidir.",
      author: "Örnek Yazar",
    },
  ]

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return blogPosts.find((post) => post.id === id) || null
}

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin] = useState(true) // This should be replaced with actual admin check logic
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editedPost, setEditedPost] = useState<BlogPost | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true)
      const fetchedPost = await fetchBlogPost(params.id)
      setPost(fetchedPost)
      setEditedPost(fetchedPost)
      setIsLoading(false)
    }
    fetchPost()
  }, [params.id])

  if (isLoading) {
    return <div>Yükleniyor...</div>
  }

  if (!post) {
    notFound()
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editedPost) {
      console.log("Updated blog post:", editedPost)
      setPost(editedPost)
      setIsEditDialogOpen(false)
    }
  }

  return (
    <article className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <Link href="/blog">
                <Button variant="ghost" className="group mb-6 -ml-2">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Bloga Geri Dön
                </Button>
              </Link>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <Pencil className="h-4 w-4" />
                  Düzenle
                </Button>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                {new Date(post.date).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <span>Yazar: {post.author}</span>
            </div>
          </div>

          <div className="relative aspect-[2/1] mb-8 rounded-lg overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" />
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[900px] w-[90vw]">
          <DialogHeader>
            <DialogTitle className="mb-2">Blog Yazısını Düzenle</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="title">Başlık</Label>
                <Input
                  id="title"
                  value={editedPost?.title}
                  onChange={(e) => setEditedPost((prev) => ({ ...prev!, title: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="author">Yazar</Label>
                  <Input
                    id="author"
                    value={editedPost?.author}
                    onChange={(e) => setEditedPost((prev) => ({ ...prev!, author: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="date">Tarih</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editedPost?.date}
                    onChange={(e) => setEditedPost((prev) => ({ ...prev!, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    value={editedPost?.category}
                    onChange={(e) => setEditedPost((prev) => ({ ...prev!, category: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Resim</Label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Current Image */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Mevcut Resim</p>
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border">
                      <img
                        src={editedPost?.image || "/placeholder.svg"}
                        alt="Current blog post image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* New Image Upload */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Yeni Resim</p>
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg bg-muted/30">
                        {imagePreview ? (
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="New blog post image"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4">
                            <div className="w-10 h-10 mb-2 rounded-lg border-2 border-dashed border-muted-foreground flex items-center justify-center">
                              <img
                                src="/placeholder.svg?height=40&width=40"
                                alt="Upload placeholder"
                                className="w-6 h-6"
                              />
                            </div>
                            <Input
                              id="image"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onloadend = () => {
                                    const result = reader.result as string
                                    setImagePreview(result)
                                    setEditedPost((prev) => ({ ...prev!, image: result }))
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={() => document.getElementById("image")?.click()}
                              className="mt-2"
                            >
                              Resim Seç
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="excerpt">Özet</Label>
                <Textarea
                  id="excerpt"
                  value={editedPost?.excerpt}
                  onChange={(e) => setEditedPost((prev) => ({ ...prev!, excerpt: e.target.value }))}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="content">İçerik</Label>
                <Textarea
                  id="content"
                  value={editedPost?.content}
                  onChange={(e) => setEditedPost((prev) => ({ ...prev!, content: e.target.value }))}
                  rows={10}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Değişiklikleri Kaydet</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </article>
  )
}

