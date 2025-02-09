import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Sword, Heart, Laugh, Rocket, Wand2, Coffee } from 'lucide-react'

const categories = [
  { 
    name: "Action", 
    icon: Sword,
    gradient: "from-red-500 to-orange-500",
    count: 1420
  },
  { 
    name: "Romance", 
    icon: Heart,
    gradient: "from-pink-500 to-rose-500",
    count: 850
  },
  { 
    name: "Comedy", 
    icon: Laugh,
    gradient: "from-yellow-500 to-amber-500",
    count: 1200
  },
  { 
    name: "Sci-Fi", 
    icon: Rocket,
    gradient: "from-blue-500 to-cyan-500",
    count: 645
  },
  { 
    name: "Fantasy", 
    icon: Wand2,
    gradient: "from-purple-500 to-violet-500",
    count: 925
  },
  { 
    name: "Slice of Life", 
    icon: Coffee,
    gradient: "from-green-500 to-emerald-500",
    count: 580
  },
]

export default function Categories() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link href={`/category/${category.name.toLowerCase()}`} key={category.name}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group relative h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                    <div className="relative z-10 space-y-4">
                      <div className="mx-auto rounded-full p-3 bg-background/10 backdrop-blur-sm ring-1 ring-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.count} Titles</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

