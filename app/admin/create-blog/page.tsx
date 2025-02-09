"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { ImageIcon, Upload, X } from "lucide-react"

export default function CreateBlogPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [date, setDate] = useState(new Date())
  const [category, setCategory] = useState("")
  const [author, setAuthor] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // API call to create blog post
    console.log("Creating blog post:", { title, content, image, date, category, author })
    router.push("/blog") // Redirect after successful creation
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Blog Oluştur</h1>
      <Card>
        <CardHeader>
          <CardTitle>Yeni Blog Yazısı</CardTitle>
          <CardDescription>Lütfen blog yazısı detaylarını ve görseli yükleyin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Başlık</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">Haberler</SelectItem>
                    <SelectItem value="reviews">İncelemeler</SelectItem>
                    <SelectItem value="features">Özellikler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="author">Yazar</Label>
                <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
              </div>
              <div>
                <Label>Tarih</Label>
                <DatePicker value={date} onChange={setDate} />
              </div>
            </div>
            <div>
              <Label htmlFor="content">İçerik</Label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={8} required />
            </div>
            <div>
              <Label htmlFor="image">Görsel</Label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg mt-2"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setImage(null)
                      setImagePreview(null)
                    }}
                    className="absolute top-2 right-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <Button variant="outline" onClick={() => document.getElementById("image")?.click()} className="mt-2">
                    <Upload className="mr-2 h-4 w-4" />
                    Görsel Yükle
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleSubmit}>
            Oluştur
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

