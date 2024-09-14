import { useCallback } from "react";
import { useQuery } from "react-query";

const API_BASE_URL = "https://api.artic.edu/api/v1/artworks";

export const useData = (page: number = 1) => {
  const getData = useCallback(async (): Promise<{
    data: IArticle[];
    pagination: IPagination;
  }> => {
    try {
      const response = await fetch(`${API_BASE_URL}?page=${page}`);

      if (!response.ok) {
        throw new Error("Failed to get data");
      }

      const { data, pagination } = await response.json();

      const articles = data.map((result: IArticle) => ({
        id: result.id,
        title: result.title || "No title",
        place_of_origin: result.place_of_origin || "Unknown",
        artist_display: result.artist_display || "Unknown",
        inscriptions: result.inscriptions || "None",
        date_start: result.date_start || 0,
        date_end: result.date_end || 0,
      }));

      return { data: articles, pagination };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }, [page]);

  const { data, isLoading, isError } = useQuery(["getData", page], getData, {
    enabled: page > 0,
    keepPreviousData: true,
  });

  return {
    results: data?.data || [],
    pagination: data?.pagination || null,
    isLoading,
    isError,
  };
};
