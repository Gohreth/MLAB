type SortBy = "asc" | "desc";

export interface ISearchParams {
  page: number;
  limit?: number;
  orderBy?: string;
  sortBy?: SortBy;
  keyword?: string;
  category?: number;
}
