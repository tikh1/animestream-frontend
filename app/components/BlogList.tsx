import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Anime of 2025',
    excerpt: 'Discover the best anime series that have taken the world by storm this year.',
    date: '2025-04-15',
  },
  {
    id: '2',
    title: 'The Evolution of Mecha Anime',
    excerpt: 'From Gundam to modern classics, explore the history and future of mecha anime.',
    date: '2025-04-10',
  },
  {
    id: '3',
    title: 'Anime Music: Beyond the Opening Theme',
    excerpt: 'Dive into the world of anime soundtracks and their impact on storytelling.',
    date: '2025-04-05',
  },
]

export default function BlogList() {
  return (
    <section className="py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-3 sm:mb-4 md:mb-6 text-xl sm:text-2xl md:text-3xl font-bold">Anime Blog</h2>
        <div className="grid gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{post.excerpt}</p>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{post.date}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${post.id}`} passHref>
                  <Button variant="outline" className="w-full text-sm sm:text-base">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

