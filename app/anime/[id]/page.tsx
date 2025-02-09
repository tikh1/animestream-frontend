import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AnimeDetail from './components/AnimeDetail'
import SeasonEpisodes from './components/SeasonEpisodes'
import Comments from './components/Comments'

// This would typically come from an API or database
const animeDatabase = {
  "attack-on-titan": {
    id: "attack-on-titan",
    title: "Attack on Titan",
    image: "/placeholder.svg?height=600&width=400",
    releaseDate: "April 7, 2013",
    duration: "24 min per ep",
    genres: ["Action", "Drama", "Fantasy", "Mystery"],
    description: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal Titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.",
    imdbRating: 9.0,
  },
  // Add more entries as needed
}

interface AnimeDetailPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: AnimeDetailPageProps): Promise<Metadata> {
  const anime = animeDatabase[params.id]

  if (!anime) {
    return {
      title: 'Anime Not Found - AnimeStream',
      description: 'The requested anime could not be found.',
    }
  }

  return {
    title: `${anime.title} - AnimeStream`,
    description: anime.description,
  }
}

export default function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const anime = animeDatabase[params.id]

  if (!anime) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimeDetail anime={anime} />
      <SeasonEpisodes animeId={params.id} />
      <Comments animeId={params.id} />
    </div>
  )
}

