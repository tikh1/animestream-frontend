'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { ImageIcon, ChevronsUpDown, Check } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const animeList = [
  { value: 'attack-on-titan', label: 'Attack on Titan' },
  { value: 'my-hero-academia', label: 'My Hero Academia' },
  { value: 'demon-slayer', label: 'Demon Slayer' },
  { value: 'one-piece', label: 'One Piece' },
  { value: 'naruto', label: 'Naruto' },
]

const formSchema = z.object({
  animeId: z.string().min(1, 'Anime seçilmelidir'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalıdır'),
  totalSeasons: z.string().regex(/^\d+$/, 'Sezon sayısı bir sayı olmalıdır'),
  episodesPerSeason: z.string().regex(/^\d+$/, 'Bölüm sayısı bir sayı olmalıdır'),
  releaseDate: z.date(),
  status: z.enum(['Yayında', 'Tamamlandı', 'Yakında']),
  coverImage: z.instanceof(File).optional(),
})

export default function CreateAnimePage() {
  const [open, setOpen] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animeId: '',
      description: '',
      totalSeasons: '',
      episodesPerSeason: '',
      releaseDate: new Date(),
      status: 'Yayında',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    // TODO: Implement API call to create anime
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('coverImage', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Anime Oluştur</h1>
      <div className="border rounded-lg p-6">
        <Card className="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Yeni Anime Detayları</CardTitle>
            <CardDescription>Lütfen anime detaylarını ve kapak fotoğrafını yükleyin.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="animeId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Anime Seçin</FormLabel>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="w-full justify-between"
                                >
                                  {field.value
                                    ? animeList.find((anime) => anime.value === field.value)?.label
                                    : "Anime seçin..."}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Anime ara..." />
                                <CommandEmpty>Anime bulunamadı.</CommandEmpty>
                                <CommandGroup>
                                  {animeList.map((anime) => (
                                    <CommandItem
                                      key={anime.value}
                                      value={anime.value}
                                      onSelect={(currentValue) => {
                                        form.setValue("animeId", currentValue)
                                        setOpen(false)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === anime.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {anime.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anime Açıklaması</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Anime açıklaması"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="releaseDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Yayın Tarihi</FormLabel>
                            <DatePicker
                              startYear={1900}
                              endYear={new Date().getFullYear()}
                              onChange={field.onChange}
                              value={field.value}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Durum</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Durum seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Yayında">Yayında</SelectItem>
                                <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                                <SelectItem value="Yakında">Yakında</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="totalSeasons"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Toplam Sezon Sayısı</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Sezon sayısı" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="episodesPerSeason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sezon Başına Bölüm</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Bölüm sayısı" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kapak Fotoğrafı</FormLabel>
                          <FormControl>
                            <Card className="border-2 border-dashed">
                              <CardContent className="pt-4 px-4 pb-4">
                                <div className="flex flex-col items-center justify-center min-h-[150px] text-center">
                                  {thumbnailPreview ? (
                                    <div className="space-y-2">
                                      <div className="relative w-full aspect-video">
                                        <img
                                          src={thumbnailPreview || "/placeholder.svg"}
                                          alt="Thumbnail preview"
                                          className="rounded-lg object-cover w-full h-full"
                                        />
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          setThumbnailPreview(null)
                                          form.setValue('coverImage', undefined)
                                        }}
                                      >
                                        Kaldır
                                      </Button>
                                    </div>
                                  ) : (
                                    <>
                                      <ImageIcon className="w-12 h-12 mb-4 text-muted-foreground" />
                                      <Input
                                        id="coverImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                          handleThumbnailChange(e)
                                          field.onChange(e.target.files?.[0])
                                        }}
                                        className="hidden"
                                      />
                                      <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById('coverImage')?.click()}
                                      >
                                        Resim Seç
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" size="lg">
                    Anime Oluştur
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

