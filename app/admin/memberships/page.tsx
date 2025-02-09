'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from 'framer-motion'

// Sample data for sold memberships
const memberships = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  username: `user${i + 1}`,
  plan: ['Basic', 'Premium', 'Ultimate'][Math.floor(Math.random() * 3)],
  startDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
  endDate: new Date(Date.now() + Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
  status: ['Active', 'Expired', 'Cancelled'][Math.floor(Math.random() * 3)],
  price: Math.floor(Math.random() * 100) + 10,
}))


export default function MembershipsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [planFilter, setPlanFilter] = useState('all')
  const [sortBy, setSortBy] = useState('startDate-desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [userId, setUserId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const itemsPerPage = 10

  const filteredMemberships = memberships
    .filter(membership => 
      membership.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || membership.status === statusFilter) &&
      (planFilter === 'all' || membership.plan === planFilter) &&
      (!userId || membership.id.toString() === userId) &&
      (!startDate || new Date(membership.startDate) >= new Date(startDate)) &&
      (!endDate || new Date(membership.endDate) <= new Date(endDate))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'startDate-desc':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        case 'startDate-asc':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        case 'price-desc':
          return b.price - a.price
        case 'price-asc':
          return a.price - b.price
        default:
          return 0
      }
    })

  const pageCount = Math.ceil(filteredMemberships.length / itemsPerPage)
  const paginatedMemberships = filteredMemberships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-5">Satılan Üyelikler</h1>
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow sm:w-[180px]"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Durum filtrele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Durumlar</SelectItem>
              <SelectItem value="Active">Aktif</SelectItem>
              <SelectItem value="Expired">Süresi Dolmuş</SelectItem>
              <SelectItem value="Cancelled">İptal Edilmiş</SelectItem>
            </SelectContent>
          </Select>
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Plan filtrele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Planlar</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Ultimate">Ultimate</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[240px]">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startDate-desc">Başlangıç Tarihi (Yeni-Eski)</SelectItem>
              <SelectItem value="startDate-asc">Başlangıç Tarihi (Eski-Yeni)</SelectItem>
              <SelectItem value="price-desc">Fiyat (Yüksek-Düşük)</SelectItem>
              <SelectItem value="price-asc">Fiyat (Düşük-Yüksek)</SelectItem>
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div>
                  <Label htmlFor="userId">Kullanıcı ID</Label>
                  <Input
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Kullanıcı ID"
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Üyelik Başlangıç Tarihi</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Üyelik Bitiş Tarihi</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
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
              <TableHead>Başlangıç Tarihi</TableHead>
              <TableHead>Bitiş Tarihi</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMemberships.map((membership) => (
              <TableRow key={membership.id}>
                <TableCell>{membership.id}</TableCell>
                <TableCell>{membership.username}</TableCell>
                <TableCell>{membership.startDate}</TableCell>
                <TableCell>{membership.endDate}</TableCell>
                <TableCell>
                  <Badge variant={
                    membership.status === 'Active' ? 'success' :
                    membership.status === 'Expired' ? 'destructive' : 'secondary'
                  }>
                    {membership.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Düzenle</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalCount={filteredMemberships.length}
          pageSize={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

