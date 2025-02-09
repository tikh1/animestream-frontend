import Link from 'next/link'
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

interface OtherBlogsProps {
  currentPostId: string;
}

export default function OtherBlogs({ currentPostId }: OtherBlogsProps) {
  const otherPosts = blogPosts.filter(post => post.id !== currentPostId)

  return (
    <section className="w-full bg-[#1c1c1c] py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl md:text-3xl font-bold text-white">Other Blog Posts</h2>
        <div className="flex flex-wrap gap-2 md:gap-4">
          {otherPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`}
            >
              <Button
                variant="outline"
                className="bg-black hover:bg-black/90 text-white border-0"
              >
                {post.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

