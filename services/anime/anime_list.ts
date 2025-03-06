import { API_ANIMES } from '@/lib/api';

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
  imdb_score: number;
  genres: string[];
  seasons: Season[];
  thumbnail: string;
}

export const AnimeList = async ()=> {
  
  const response = await fetch(`${API_ANIMES}`);

  if (!response.ok) throw new Error('Anime bilgileri alınamadı.');

  const animelistData = await response.json();
  
  //console.log("anime_list_service:", animelistData.data.animes);
  
  //const episodes = seasons?.[0]?.episodes ?? [];

  return animelistData.data.animes.map((anime: any) => ({
    id: anime.id,
    name: anime.name,
    genre: anime.genres || [],
    year: anime.seasons?.[0]?.year || "Bilinmiyor",
    rating: Number(anime.imdb_score) || 0,
    seasons: anime.seasons?.length || 1,
    episodesPerSeason: anime.seasons?.[0]?.episodes?.length || 1,
    thumbnail: anime.thumbnail || "",
  }));
};
