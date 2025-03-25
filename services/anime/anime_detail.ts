import { API_ANIME } from '@/lib/api';

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

export interface AnimeData {
  id: number;
  name: string;
  release_date: string;
  imdb_score: number;
  summary: string;
  genres: string[];
  seasons: Season[];
  thumbnail: string;
  comments: string[];
}

export const AnimeDetails = async (slug: string): Promise<AnimeData> => {
  
  const response = await fetch(`${API_ANIME}/${slug}`);

  if (!response.ok) throw new Error('Anime bilgileri alınamadı.');

  const animeData = await response.json();
  console.log("animedetail_service:", animeData);

  return {
    id: animeData.id,
    name: animeData.name,
    release_date: animeData.release_date,
    imdb_score: Number(animeData.imdb_score) || 0,
    summary: animeData.summary,
    genres: animeData.genres || [],
    seasons: animeData.seasons || [],
    thumbnail: animeData.thumbnail || "",
    comments: animeData.comments || [],
  };
};
