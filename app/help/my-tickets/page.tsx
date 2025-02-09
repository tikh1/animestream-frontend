"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

// This would typically come from an API
const mockTickets = [
  { id: 1, subject: "Video yüklenmiyor", category: "Teknik Sorun", status: "Açık", createdAt: "2023-06-01" },
  { id: 2, subject: "Ödeme sorunu", category: "Ödeme ve Faturalama", status: "Yanıtlandı", createdAt: "2023-05-28" },
  { id: 3, subject: "Yeni anime önerisi", category: "İçerik Önerisi", status: "Kapalı", createdAt: "2023-05-20" },
]

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState(mockTickets)
  const router = useRouter()

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ticketlarım</h1>
        <Link href="/help/submit-ticket">
          <Button>Yeni Ticket Oluştur</Button>
        </Link>
      </div>
      {tickets.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Henüz hiç ticket oluşturmadınız.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/help/ticket/${ticket.id}`)}
            >
              <CardHeader>
                <CardTitle>{ticket.subject}</CardTitle>
                <CardDescription>Kategori: {ticket.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge
                    variant={
                      ticket.status === "Açık" ? "default" : ticket.status === "Yanıtlandı" ? "secondary" : "outline"
                    }
                  >
                    {ticket.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{ticket.createdAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

