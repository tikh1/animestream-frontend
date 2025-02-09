import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const popularAnime = [
  { title: "My Hero Academia", image: "/placeholder.svg?height=400&width=300" },
  { title: "Demon Slayer", image: "/placeholder.svg?height=400&width=300" },
  { title: "One Piece", image: "/placeholder.svg?height=400&width=300" },
  { title: "Jujutsu Kaisen", image: "/placeholder.svg?height=400&width=300" },
]

export default function PopularAnime() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="mb-6 text-3xl font-bold">Popular Anime</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularAnime.map((anime, index) => (
            <Card key={index}>
              <CardHeader className="p-0">
                <img src={anime.image} alt={anime.title} className="h-48 w-full object-cover" />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>{anime.title}</CardTitle>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">Watch Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

