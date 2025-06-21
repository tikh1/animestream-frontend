import { getAnime } from '@/lib/api';

export interface Episode {
    id: number;
    name: string;
    slug: string;
    summary: string;
    season_id: number;
    video_id: number;
    duration: string;
    thumbnail: string;
}

export interface Season {
    id: number;
    name: string;
    episodes: Episode[];
}

export interface Genre {
    name: string;
    pivot: {
        anime_id: number;
        genre_id: number;
    };
}

export interface AnimeData {
    id: number;
    name: string;
    slug: string;
    release_date: string;
    imdb_score: number;
    summary: string;
    genres: Genre[];
    seasons: Season[];
    thumbnail: string;
    comments: any[];
}

export const fetchAnimeDetail = async (slug: string): Promise<AnimeData> => {
    try {
        const response = await getAnime(slug);
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

