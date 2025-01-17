export type TQueryParams = {
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  totalPages?: number;
};
