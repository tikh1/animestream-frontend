"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { AnimeCard } from "@/components/AnimeCard";
import { Pagination } from "./components/Pagination";
import fetchAnimeList from "@/services/anime/anime_list";
import { toast } from "sonner";

interface Anime {
  id: number;
  name: string;
  slug: string;
  genre: string[];
  year: number;
  rating: number;
  seasons: number;
  episodesPerSeason: number;
  thumbnail: string;
}

export default function AnimeListPage() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("title");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAnimeList();
      setAnimes(data);
      setFilteredAnimes(data);
    } catch (error) {
      console.error("Hata oluştu:", error);
      setError("Anime listesi yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      toast.error("Anime listesi yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let result = [...animes];

    if (searchTerm) {
      result = result.filter((anime) =>
        anime.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenres.length > 0) {
      result = result.filter((anime) =>
        selectedGenres.some((genre) => anime.genre.includes(genre))
      );
    }

    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "year") return Number(b.year) - Number(a.year);
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

    setFilteredAnimes(result);
    setCurrentPage(1);
  }, [searchTerm, selectedGenres, sortBy, animes]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAnimes.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleGenreChange = (value: string[]) => {
    setSelectedGenres(value);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-center text-xl">Yükleniyor...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-center text-xl text-red-500">{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Anime Listesi</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Anime ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Sıralama" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Başlık</SelectItem>
            <SelectItem value="year">Yıl</SelectItem>
            <SelectItem value="rating">Puan</SelectItem>
          </SelectContent>
        </Select>
        <MultiSelect
          options={[
            { value: "Action", label: "Aksiyon" },
            { value: "Adventure", label: "Macera" },
            { value: "Comedy", label: "Komedi" },
            { value: "Drama", label: "Drama" },
            { value: "Fantasy", label: "Fantezi" },
            { value: "Horror", label: "Korku" },
            { value: "Mystery", label: "Gizem" },
            { value: "Psychological", label: "Psikolojik" },
            { value: "Romance", label: "Romantik" },
            { value: "Sci-Fi", label: "Bilim Kurgu" },
            { value: "Slice of Life", label: "Günlük Yaşam" },
            { value: "Supernatural", label: "Doğaüstü" },
            { value: "Thriller", label: "Gerilim" },
          ]}
          defaultValue={selectedGenres}
          onValueChange={handleGenreChange}
          placeholder="Türleri seçin"
          className="md:w-1/3"
        />
      </div>
      {filteredAnimes.length === 0 ? (
        <p className="text-center text-xl">Sonuç bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {currentItems.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={{
                id: anime.id,
                name: anime.name, 
                slug: anime.slug,
                genre: anime.genre,
                year: anime.year,
                rating: anime.rating,
                seasons: anime.seasons,
                episodesPerSeason: anime.episodesPerSeason,
                thumbnail: anime.thumbnail,
              }}
              variant="default"
              showRank={false}
            />
          ))}
        </div>
      )}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredAnimes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
