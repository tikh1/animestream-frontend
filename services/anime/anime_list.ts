import { getAnimes } from '@/lib/api';

export interface Episode {
  id: number;
  name: string;
  slug: string;
  summary: string;
  season_id: number;
  video_id: number;
  duration: number;
}

export interface Season {
  id: number;
  name: string;
  episodes: Episode[];
}

export interface AnimeList {
  id: number;
  name: string;
  slug: string;
  imdb_score: number;
  genres: string[];
  seasons: Season[];
  thumbnail: string;
}

const fetchAnimeList = async () => {
  try {
    const response = await getAnimes();
    const animelistData = response.data.data.animes;
    
    console.log('Raw API Response:', animelistData) // Debug için
    
    return animelistData.map((anime: any) => ({
      id: anime.id,
      slug: anime.slug,
      name: anime.name,
      genre: anime.genres || [],
      year: anime.seasons?.[0]?.year || "Bilinmiyor",
      rating: Number(anime.imdb_score) || 0,
      seasons: anime.seasons?.length || 1,
      episodesPerSeason: anime.seasons?.[0]?.episodes?.length || 1,
      thumbnail: anime.thumbnail || "",
    }));
  } catch (error) {
    console.error('Anime listesi alınırken hata oluştu:', error);
    throw error;
  }
};

export default fetchAnimeList;