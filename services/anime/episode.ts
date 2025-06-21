import { getAnimeEpisodes, getAnime } from '@/lib/api';

export interface Episode {
  id: number;
  name: string;
  slug: string;
  summary: string;
  season_id: number;
  video_id: number;
  duration: number;
  thumbnail?: string;
  video_url?: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  comment: string;
  user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
  };
  parent?: number;
}

export interface Season {
  id: number;
  name: string;
  episodes: Episode[];
}

export interface AnimeData {
  id: number;
  name: string;
  slug: string;
  release_date: string;
  imdb_score: number;
  summary: string;
  genres: string[];
  seasons: Season[];
  thumbnail: string;
  comments: string[];
}

export const fetchEpisode = async (animeSlug: string, episodeSlug: string): Promise<Episode | null> => {
  try {
    const response = await getAnimeEpisodes(animeSlug, episodeSlug);
    const episodeData = response.data.data.episode;
    
    // The episode data is directly in the response
    if (episodeData) {
      return {
        id: episodeData.id,
        name: episodeData.name,
        slug: episodeData.slug,
        summary: episodeData.summary || '',
        season_id: episodeData.season?.id || 0,
        video_id: episodeData.id, // Using episode id as video_id for now
        duration: episodeData.duration ? parseDuration(episodeData.duration) : 0,
        thumbnail: episodeData.thumbnail,
        video_url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
        comments: episodeData.comments || [],
      };
    }
    
    return null;
  } catch (error) {
    console.error('Episode alınırken hata oluştu:', error);
    throw error;
  }
};

// Helper function to parse duration string to seconds
const parseDuration = (duration: string): number => {
  const parts = duration.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
};

export const fetchAnimeWithEpisodes = async (animeSlug: string): Promise<AnimeData> => {
  try {
    const response = await getAnime(animeSlug);
    const animeData = response.data.data.anime;

    return {
      id: animeData.id,
      name: animeData.name,
      slug: animeData.slug,
      release_date: animeData.release_date,
      imdb_score: Number(animeData.imdb_score) || 0,
      summary: animeData.summary,
      genres: animeData.genres || [],
      seasons: animeData.seasons || [],
      thumbnail: animeData.thumbnail || "",
      comments: animeData.comments || [],
    };
  } catch (error) {
    console.error('Anime detayı alınırken hata oluştu:', error);
    throw error;
  }
}; 