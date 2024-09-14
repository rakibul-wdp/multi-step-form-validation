import { useQuery } from "react-query";

const API_BASE_URL = "https://api.artic.edu/api/v1/artworks";

export const useData = (page: number = 1) => {
  const getData = async (): Promise<{
    data: IArticle[];
    pagination: IPagination;
  }> => {
    const response = await fetch(`${API_BASE_URL}?page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to get data");
    }

    const json = await response.json();
    const { data, pagination } = json;

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
  };

  const { data, isLoading } = useQuery(["getData", page], getData, {
    enabled: !!page,
    keepPreviousData: true,
  });

  return {
    results: data?.data || [],
    pagination: data?.pagination || null,
    isLoading,
  };
};
