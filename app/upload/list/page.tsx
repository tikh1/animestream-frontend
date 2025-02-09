import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import cn from 'classnames'

const uploadedAnimes = [
  { 
    id: 1, 
    seasonId: "S04",
    episodeId: "E01",
    title: "Attack on Titan S4E1", 
    uploadDate: "2023-06-01", 
    status: "Yayında" 
  },
  { 
    id: 2, 
    seasonId: "S05",
    episodeId: "E12",
    title: "My Hero Academia S5E12", 
    uploadDate: "2023-06-05", 
    status: "İşleniyor" 
  },
  { 
    id: 3, 
    seasonId: "S02",
    episodeId: "E03",
    title: "Demon Slayer S2E3", 
    uploadDate: "2023-06-10", 
    status: "Yayında" 
  },
]

export function UploadedAnimesPage() {
  return (
    <>
      <div className="max-w-6xl mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Yüklenen Animeler</CardTitle>
            <CardDescription>Yüklediğiniz tüm anime bölümlerinin listesi</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Sezon ID</TableHead>
                  <TableHead>Bölüm ID</TableHead>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Yükleme Tarihi</TableHead>
                  <TableHead>Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadedAnimes.map((anime) => (
                  <TableRow key={anime.id}>
                    <TableCell>{anime.id}</TableCell>
                    <TableCell>{anime.seasonId}</TableCell>
                    <TableCell>{anime.episodeId}</TableCell>
                    <TableCell>{anime.title}</TableCell>
                    <TableCell>{anime.uploadDate}</TableCell>
                    <TableCell>
                      <div className={cn(
                        "w-fit px-2 py-1 rounded-full text-xs font-medium",
                        anime.status === "Yayında" ? "bg-green-500/20 text-green-600 dark:text-green-400" : 
                        anime.status === "İşleniyor" ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
                        "bg-red-500/20 text-red-600 dark:text-red-400"
                      )}>
                        {anime.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

