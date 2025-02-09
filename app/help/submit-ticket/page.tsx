"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

export default function SubmitTicketPage() {
  const [subject, setSubject] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to submit the ticket
    console.log("Submitting ticket:", { subject, category, description })
    // For now, we'll just redirect to the view tickets page
    router.push("/help/my-tickets")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Yeni Ticket Oluştur</h1>
        <Link href="/help/my-tickets">
          <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Ticketlarım
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Yeni Ticket Oluştur</CardTitle>
          <CardDescription>Sorununuzu veya önerinizi bize iletin</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Konu
              </label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Kategori
              </label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Teknik Sorun</SelectItem>
                  <SelectItem value="account">Hesap İşlemleri</SelectItem>
                  <SelectItem value="billing">Ödeme ve Faturalama</SelectItem>
                  <SelectItem value="content">İçerik Önerisi</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Açıklama
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleSubmit}>
            Ticket Gönder
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

