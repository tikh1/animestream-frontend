import { Table, TableBody, CardContent, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import Link from "next/link"

const watchHistory = [
  { id: 1, title: "Attack on Titan S4E1", episode: "S3E12", date: "2023-06-15", progress: 80 },
  { id: 2, title: "My Hero Academia S5E12", episode: "S4E22", date: "2023-06-14", progress: 100 },
  { id: 3, title: "Demon Slayer S2E3", episode: "S2E10", date: "2023-06-13", progress: 60 },
  { id: 4, title: "One Punch Man S2E5", episode: "S2E5", date: "2023-06-12", progress: 40 },
  { id: 5, title: "Jujutsu Kaisen S1E20", episode: "S1E20", date: "2023-06-11", progress: 90 },
]

export function WatchHistory() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      <h3 className="text-2xl font-bold mb-4">İzleme Geçmişi</h3>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead>Anime</TableHead>
              <TableHead>Bölüm</TableHead>
              <TableHead>İzlenme Tarihi</TableHead>
              <TableHead>İlerleme</TableHead>
              <TableHead>İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchHistory.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.episode}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/anime/${item.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary hover:text-primary-foreground hover:bg-primary"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Devam Et
                    </Button>
                  </Link>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}

