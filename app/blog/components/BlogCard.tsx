import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  author: string
}

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group">
      <Link href={`/blog/${post.id}`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <Badge className="absolute top-2 right-2" variant="secondary">
            {post.category}
          </Badge>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <CalendarDays className="mr-2 h-4 w-4" />
            {new Date(post.date).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{post.author}</span>
          <Button variant="ghost" className="group/btn p-0 h-auto">
            Devamını Oku
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}

