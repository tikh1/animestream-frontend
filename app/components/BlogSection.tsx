import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, ArrowRight } from 'lucide-react'

const featuredBlogs = [
  {
    slug: 'top-10-upcoming-anime-2024',
    title: 'Top 10 Most Anticipated Anime of 2024',
    excerpt: 'From long-awaited sequels to exciting new adaptations, here are the most anticipated anime coming in 2024.',
    image: '/placeholder.svg?height=400&width=600&text=Upcoming+Anime+2024',
    date: '2024-01-05',
    category: 'News'
  },
  {
    slug: 'evolution-of-anime-animation',
    title: 'The Evolution of Anime Animation: From Cel to Digital',
    excerpt: 'A deep dive into how anime animation techniques have evolved over the decades.',
    image: '/placeholder.svg?height=400&width=600&text=Anime+Evolution',
    date: '2024-01-03',
    category: 'Analysis'
  },
  {
    slug: 'impact-of-manga-on-anime',
    title: 'How Manga Influences Modern Anime Adaptations',
    excerpt: 'Exploring the relationship between manga source materials and their anime adaptations.',
    image: '/placeholder.svg?height=400&width=600&text=Manga+Impact',
    date: '2024-01-01',
    category: 'Feature'
  }
]

export default function BlogSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest from Blog</h2>
          <Link href="/blog">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBlogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug}>
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    {blog.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {new Date(blog.date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {blog.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button variant="ghost" className="group/btn p-0 h-auto">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

