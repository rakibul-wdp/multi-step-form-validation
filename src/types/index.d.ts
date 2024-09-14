declare interface IArticle {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

declare interface IPagination {
  current_page: number;
  total_pages: number;
  total: number;
  limit: number;
}
