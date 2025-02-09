import { UploadPage } from "@/app/upload/page"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdminUploadPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-8">Anime Yükle</h1>
      <Card>
        <UploadPage />
      </Card>
      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
        <p>Eğer eklemek istediğiniz anime yoksa buradan anime oluşturma isteği açabilirsiniz</p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              İstek Oluştur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Anime Oluşturma İsteği</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="anime-name" className="text-right">
                  Anime Adı
                </Label>
                <Input id="anime-name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="anime-description" className="text-right">
                  Açıklama
                </Label>
                <Textarea id="anime-description" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Gönder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

