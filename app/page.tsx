import Hero from './components/Hero'
import FeaturedAnime from './components/FeaturedAnime'
import Categories from './components/Categories'
import LatestAnime from './components/LatestAnime'
import NewReleases from './components/NewReleases'
import UserReviews from './components/UserReviews'
import BlogSection from './components/BlogSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AnimeStream - Nihai Anime Destinasyonunuz',
  description: 'En iyi anime dizilerini ve filmlerini keşfedin, izleyin ve tartışın. Anime severler topluluğumuza katılın!',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Hero />
      <FeaturedAnime />
      <NewReleases />
      <Categories />
      <LatestAnime />
      <UserReviews />
      <BlogSection />
    </div>
  )
}

