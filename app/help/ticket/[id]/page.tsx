"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// This would typically come from an API
const mockTickets = [
  {
    id: 1,
    subject: "Video yüklenmiyor",
    category: "Teknik Sorun",
    status: "Açık",
    createdAt: "2023-06-01",
    description: "Video yüklemeye çalışırken hata alıyorum. Lütfen yardım edin.",
  },
  {
    id: 2,
    subject: "Ödeme sorunu",
    category: "Ödeme ve Faturalama",
    status: "Yanıtlandı",
    createdAt: "2023-05-28",
    description: "Kredi kartımdan ödeme alındı ama hesabım premium olmadı.",
  },
  {
    id: 3,
    subject: "Yeni anime önerisi",
    category: "İçerik Önerisi",
    status: "Kapalı",
    createdAt: "2023-05-20",
    description: "'Kimetsu no Yaiba' adlı animeyi platformunuza eklemenizi öneriyorum.",
  },
]

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<(typeof mockTickets)[0] | null>(null)
  const router = useRouter()
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false)
  const [isTicketOn, setIsTicketOn] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch the ticket data from an API
    const fetchedTicket = mockTickets.find((t) => t.id === Number.parseInt(params.id))
    if (fetchedTicket) {
      setTicket(fetchedTicket)
    } else {
      // Redirect to 404 page if ticket not found
      router.push("/404")
    }
  }, [params.id, router])

  if (!ticket) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ticket Detayı</h1>
        <Link href="/help/my-tickets">
          <Button variant="outline">Tüm Ticketlar</Button>
        </Link>
      </div>
      <Card>
        <CardHeader className="flex flex-col space-y-2">
          <div className="flex justify-between items-center w-full">
            <CardTitle>
              Başlık: {ticket.subject} &nbsp;&nbsp;#{ticket.id}
            </CardTitle>
            <div className="flex items-center space-x-2">
              {isTicketOn && (
                <Button variant="destructive" onClick={() => setIsCloseDialogOpen(true)}>
                  Ticket'ı Kapat
                </Button>
              )}
              <Badge
                variant={
                  ticket.status === "Açık" ? "default" : ticket.status === "Yanıtlandı" ? "secondary" : "outline"
                }
              >
                {ticket.status}
              </Badge>
            </div>
          </div>
          <CardDescription>
            Açılma Tarihi:{" "}
            {new Date(ticket.createdAt).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
          </CardDescription>
          <CardDescription>Kategori: {ticket.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-6">
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[70%]">
                  <div className="text-xs text-primary-foreground/80 mb-1">Siz</div>
                  <p>{ticket.description}</p>
                  <span className="text-xs mt-1 block">
                    <span className="float-left">
                      {new Date(ticket.createdAt)
                        .toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" })
                        .replace(/-/g, "/")}
                    </span>
                    <span className="float-right">21:52</span>
                  </span>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-secondary p-3 rounded-lg max-w-[70%]">
                  <div className="text-xs text-muted-foreground mb-1">Admin</div>
                  <p>Merhaba, sorununuzu aldık. En kısa sürede size yardımcı olacağız.</p>
                  <span className="text-xs mt-1 block">
                    <span className="float-left">2025/01/25</span>
                    <span className="float-right">21:53</span>
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[70%]">
                  <div className="text-xs text-primary-foreground/80 mb-1">Siz</div>
                  <p>Teşekkürler, ne zaman çözülebilir acaba?</p>
                  <span className="text-xs mt-1 block">
                    <span className="float-left">
                      {new Date(ticket.createdAt)
                        .toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" })
                        .replace(/-/g, "/")}
                    </span>
                    <span className="float-right">21:55</span>
                  </span>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-secondary p-3 rounded-lg max-w-[70%]">
                  <div className="text-xs text-muted-foreground mb-1">Admin</div>
                  <p>24 saat içerisinde sorununuzu çözeceğiz. Biraz teknik inceleme gerekiyor.</p>
                  <span className="text-xs mt-1 block">
                    <span className="float-left">2025/01/25</span>
                    <span className="float-right">22:00</span>
                  </span>
                </div>
              </div>
            </div>

            {isTicketOn ? (
              <div className="mt-12">
                <div className="flex items-center space-x-2 bg-secondary rounded-lg p-2">
                  <input
                    type="text"
                    placeholder="Mesajınızı yazın..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                  />
                  <Button size="sm" className="shrink-0">
                    Gönder
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-12 p-4 bg-secondary rounded-lg text-center">
                <p>
                  Bu ticket <span className="font-semibold">25 Ocak 2025</span> tarihinde{" "}
                  <span className="font-semibold">AdminAdi</span> tarafından kapatıldı.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => router.push("/help/my-tickets")}>
            Geri Dön
          </Button>
        </CardFooter>
        <Dialog open={isCloseDialogOpen} onOpenChange={setIsCloseDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ticket'ı Kapatmak İstediğinizden Emin misiniz?</DialogTitle>
              <DialogDescription>
                Bu işlem geri alınamaz. Ticket kapatıldıktan sonra yeniden açılamaz.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCloseDialogOpen(false)}>
                İptal
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  // Implement ticket closing logic here
                  console.log("Ticket closed")
                  setIsTicketOn(false)
                  setIsCloseDialogOpen(false)
                }}
              >
                Ticket'ı Kapat
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  )
}

