'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, Search, Clock, X } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Örnek izleme geçmişi verisi
const generateWatchHistoryData = (count: number) => {
  const animes = [
    "Attack on Titan", "My Hero Academia", "Demon Slayer", "One Punch Man", 
    "Jujutsu Kaisen", "Fullmetal Alchemist: Brotherhood", "Death Note", 
    "Naruto", "One Piece", "Tokyo Ghoul"
  ]
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: animes[Math.floor(Math.random() * animes.length)],
    episode: `S${Math.floor(Math.random() * 5) + 1}E${Math.floor(Math.random() * 24) + 1}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    duration: `${(Math.floor(Math.random() * 5) + 20) * 60}`, // 20-24 dakika arasında, saniye cinsinden
    image: `/placeholder.svg?height=150&width=100&text=${encodeURIComponent(animes[Math.floor(Math.random() * animes.length)])}`,
    progress: Math.floor(Math.random() * 101), // Random progress between 0 and 100
  }))
}

const formatDuration = (progress: number, duration: string) => {
  const totalSeconds = parseInt(duration) ;
  const watchedSeconds = Math.floor(progress / 100 * totalSeconds);
  
  const format = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
  };

  return `${format(watchedSeconds)} / ${format(totalSeconds)}`;
};

export default function WatchHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [watchHistory, setWatchHistory] = useState(generateWatchHistoryData(20))
  const [displayedItems, setDisplayedItems] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [itemToRemove, setItemToRemove] = useState<number | null>(null)

  const filteredAndSortedHistory = watchHistory
    .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.date.getTime() - a.date.getTime()
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

  const loadMore = () => {
    setDisplayedItems(prev => prev + 10)
  }

  const removeHistoryItem = (id: number) => {
    setItemToRemove(id)
    setDialogOpen(true)
  }

  const confirmRemove = () => {
    if (itemToRemove !== null) {
      setWatchHistory(prevHistory => prevHistory.filter(item => item.id !== itemToRemove))
      setDialogOpen(false)
      setItemToRemove(null)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
      loadMore()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">İzleme Geçmişi</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              placeholder="Anime ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
          <Select onValueChange={setSortBy} defaultValue={sortBy}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Tarih</SelectItem>
              <SelectItem value="title">Başlık</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAndSortedHistory.slice(0, displayedItems).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="overflow-hidden bg-black/90 group">
              <CardContent className="p-0 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 hover:bg-black/50"
                  onClick={() => removeHistoryItem(item.id)}
                >
                  <X className="h-4 w-4 text-white/70" />
                </Button>
                <div className="flex h-[200px]">
                  <div className="w-[200px] flex-shrink-0 relative group">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-all duration-300 filter brightness-75 saturate-75 group-hover:brightness-100 group-hover:saturate-100" 
                    />
                    {(() => {
                      const seasonNumber = parseInt(item.episode.split('E')[0].substring(1));
                      return (
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                          {seasonNumber} {seasonNumber === 1 ? 'Season' : 'Seasons'}
                        </Badge>
                      );
                    })()}
                  </div>
                  <div className="flex-grow p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Sezon {item.episode.split('E')[0].substring(1)} • Bölüm {item.episode.split('E')[1]}
                      </p>
                      <div className="mt-4">
                        <div className="w-full bg-white/10 h-1 rounded-full">
                          <div
                            className="bg-white h-full rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <div className="flex flex-col mt-3 text-sm text-muted-foreground"> {/* Changed mt-1 to mt-3 */}
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span className="text-sm">
                              {formatDuration(item.progress, item.duration)}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span className="text-sm">{format(item.date, 'dd MMM yyyy', { locale: tr })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href={`/anime/${item.id}`} className="block w-full">
                        <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 w-full">
                          Devam Et
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {displayedItems < filteredAndSortedHistory.length && (
        <div className="text-center mt-8">
          <Button onClick={loadMore} variant="outline">Daha Fazla Yükle</Button>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>İzleme Geçmişinden Kaldır</DialogTitle>
            <DialogDescription>
              Bu öğeyi izleme geçmişinizden kaldırmak istediğinizden emin misiniz?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Hayır</Button>
            <Button onClick={confirmRemove}>Evet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

