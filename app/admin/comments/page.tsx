'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Check, X, Trash2, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Örnek yorum verileri
const comments = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  user: `User${Math.floor(Math.random() * 100) + 1}`,
  animeTitle: `Anime ${Math.floor(Math.random() * 20) + 1}`,
  episodeNumber: Math.floor(Math.random() * 24) + 1,
  content: `This is a sample comment ${i + 1}. It can be quite long and may contain spoilers.`,
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  status: ['Onaylandı', 'Beklemede', 'Reddedildi'][Math.floor(Math.random() * 3)],
  isSpoiler: Math.random() > 0.7,
  likes: Math.floor(Math.random() * 100),
  reports: Math.floor(Math.random() * 5),
}))

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedComment, setSelectedComment] = useState<typeof comments[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState<'approve' | 'reject' | 'delete' | null>(null)

  // Gelişmiş filtreler için state'ler
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [likesMin, setLikesMin] = useState('')
  const [likesMax, setLikesMax] = useState('')
  const [reportsMin, setReportsMin] = useState('')
  const [reportsMax, setReportsMax] = useState('')
  const [spoilerFilter, setSpoilerFilter] = useState('all')
  const [commentId, setCommentId] = useState('')
  const [username, setUsername] = useState('')

  const itemsPerPage = 10

  const filteredComments = comments
    .filter(comment =>
      (searchTerm === '' || 
       comment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
       comment.animeTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
       comment.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || comment.status === statusFilter) &&
      (!dateStart || new Date(comment.date) >= new Date(dateStart)) &&
      (!dateEnd || new Date(comment.date) <= new Date(dateEnd)) &&
      (!likesMin || comment.likes >= parseInt(likesMin)) &&
      (!likesMax || comment.likes <= parseInt(likesMax)) &&
      (!reportsMin || comment.reports >= parseInt(reportsMin)) &&
      (!reportsMax || comment.reports <= parseInt(reportsMax)) &&
      (spoilerFilter === 'all' || 
       (spoilerFilter === 'spoiler' && comment.isSpoiler) || 
       (spoilerFilter === 'non-spoiler' && !comment.isSpoiler)) &&
      (commentId === '' || comment.id.toString() === commentId) &&
      (username === '' || comment.user.toLowerCase().includes(username.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'likes-desc':
          return b.likes - a.likes
        case 'likes-asc':
          return a.likes - b.likes
        case 'reports-desc':
          return b.reports - a.reports
        case 'reports-asc':
          return a.reports - b.reports
        default:
          return 0
      }
    })

  const pageCount = Math.ceil(filteredComments.length / itemsPerPage)
  const paginatedComments = filteredComments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleCommentAction = (action: 'approve' | 'reject' | 'delete') => {
    setDialogAction(action)
    setIsDialogOpen(true)
  }

  const confirmAction = () => {
    if (selectedComment && dialogAction) {
      // Burada gerçek bir API çağrısı yapılacak
      console.log(`${dialogAction} action for comment ${selectedComment.id}`)
      setIsDialogOpen(false)
      setSelectedComment(null)
      setDialogAction(null)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-5">Yorum Yönetimi</h1>
      
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow sm:w-[200px]"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Durum filtrele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Durumlar</SelectItem>
              <SelectItem value="Onaylandı">Onaylandı</SelectItem>
              <SelectItem value="Beklemede">Beklemede</SelectItem>
              <SelectItem value="Reddedildi">Reddedildi</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy} className="sm:w-[220px]">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Tarih (Yeni-Eski)</SelectItem>
              <SelectItem value="date-asc">Tarih (Eski-Yeni)</SelectItem>
              <SelectItem value="likes-desc">Beğeni (Çok-Az)</SelectItem>
              <SelectItem value="likes-asc">Beğeni (Az-Çok)</SelectItem>
              <SelectItem value="reports-desc">Şikayet (Çok-Az)</SelectItem>
              <SelectItem value="reports-asc">Şikayet (Az-Çok)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2"
          >
            {showAdvancedFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            Gelişmiş Filtreler
          </Button>
        </div>

        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                <div>
                  <Label htmlFor="commentId">Yorum ID</Label>
                  <Input
                    id="commentId"
                    type="text"
                    value={commentId}
                    onChange={(e) => setCommentId(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="username">Kullanıcı Adı</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dateStart">Yorum Tarihi (Başlangıç)</Label>
                  <Input
                    id="dateStart"
                    type="date"
                    value={dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="likesMin">Min Beğeni</Label>
                  <Input
                    id="likesMin"
                    type="number"
                    value={likesMin}
                    onChange={(e) => setLikesMin(e.target.value)}
                    min={0}
                  />
                </div>
                <div>
                  <Label htmlFor="likesMax">Max Beğeni</Label>
                  <Input
                    id="likesMax"
                    type="number"
                    value={likesMax}
                    onChange={(e) => setLikesMax(e.target.value)}
                    min={0}
                  />
                </div>
                <div>
                  <Label htmlFor="dateEnd">Yorum Tarihi (Bitiş)</Label>
                  <Input
                    id="dateEnd"
                    type="date"
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reportsMin">Min Şikayet</Label>
                  <Input
                    id="reportsMin"
                    type="number"
                    value={reportsMin}
                    onChange={(e) => setReportsMin(e.target.value)}
                    min={0}
                  />
                </div>
                <div>
                  <Label htmlFor="reportsMax">Max Şikayet</Label>
                  <Input
                    id="reportsMax"
                    type="number"
                    value={reportsMax}
                    onChange={(e) => setReportsMax(e.target.value)}
                    min={0}
                  />
                </div>
                <div>
                  <Label htmlFor="spoilerFilter">Spoiler Filtresi</Label>
                  <Select value={spoilerFilter} onValueChange={setSpoilerFilter}>
                    <SelectTrigger id="spoilerFilter">
                      <SelectValue placeholder="Spoiler filtrele" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="spoiler">Sadece Spoiler</SelectItem>
                      <SelectItem value="non-spoiler">Spoiler Olmayan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Kullanıcı</TableHead>
              <TableHead>Anime</TableHead>
              <TableHead>Bölüm</TableHead>
              <TableHead>Yorum</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Beğeni</TableHead>
              <TableHead>Şikayet</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.id}</TableCell>
                <TableCell>{comment.user}</TableCell>
                <TableCell>{comment.animeTitle}</TableCell>
                <TableCell>{comment.episodeNumber}</TableCell>
                <TableCell>
                  <div className="max-w-xs truncate">
                    {comment.isSpoiler && (
                      <Badge variant="destructive" className="mr-2">Spoiler</Badge>
                    )}
                    {comment.content}
                  </div>
                </TableCell>
                <TableCell>{new Date(comment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={
                    comment.status === 'Onaylandı' ? 'success' :
                    comment.status === 'Beklemede' ? 'warning' : 'destructive'
                  }>
                    {comment.status}
                  </Badge>
                </TableCell>
                <TableCell>{comment.likes}</TableCell>
                <TableCell>{comment.reports}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedComment(comment)
                        handleCommentAction('approve')
                      }}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedComment(comment)
                        handleCommentAction('reject')
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedComment(comment)
                        handleCommentAction('delete')
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalCount={filteredComments.length}
          pageSize={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === 'approve' ? 'Yorumu Onayla' :
               dialogAction === 'reject' ? 'Yorumu Reddet' :
               dialogAction === 'delete' ? 'Yorumu Sil' : 'Yorum İşlemi'}
            </DialogTitle>
            <DialogDescription>
              Bu işlemi gerçekleştirmek istediğinizden emin misiniz?
            </DialogDescription>
          </DialogHeader>
          {selectedComment && (
            <div className="mt-4">
              <Label htmlFor="commentContent">Yorum İçeriği:</Label>
              <Textarea
                id="commentContent"
                value={selectedComment.content}
                readOnly
                className="mt-2"
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>İptal</Button>
            <Button onClick={confirmAction}>
              {dialogAction === 'approve' ? 'Onayla' :
               dialogAction === 'reject' ? 'Reddet' :
               dialogAction === 'delete' ? 'Sil' : 'Onayla'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

